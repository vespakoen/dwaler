var fs = require('fs')
var path = require('path')
var zlib = require('zlib')
var mbtiles = require('mbtiles')
var through = require('through')
var mkdirp = require('mkdirp');
var geojsonToTiles = require('./geojson-to-tiles')

var maxZoom = 14;
var pattern = 'features.*.geometry.coordinates.*'
var mbtilesPath = __dirname + '/../data/map.mbtiles'
var outputDir = __dirname + '/../ios/www/map'
var tilesURl = 'http://localhost:9997/' + path.basename(outputDir) + '/{z}/{x}/{y}.pbf'

// var maxZoom = 14;
// var pattern = 'features.*.geometry.coordinates'
// var mbtilesPath = '../ios/www/camps.mbtiles'
// var outputDir = '../ios/www/camps'
// var tilesURl = 'http://localhost:9997/' + path.basename(outputDir) + '/{z}/{x}/{y}.pbf'

function fixTileJSONCenter(tileJSON) {
  if (tileJSON.bounds && !tileJSON.center) {
    var fitWidth = 1024;
    var tiles = fitWidth / 256;
    tileJSON.center = [
      (tileJSON.bounds[0] + tileJSON.bounds[2]) / 2,
      (tileJSON.bounds[1] + tileJSON.bounds[3]) / 2,
      Math.round(
        -Math.log((tileJSON.bounds[2] - tileJSON.bounds[0]) / 360 / tiles) /
        Math.LN2
      )
    ];
  }
};

var tileJSON = {}
var mbtilesFile = path.join(mbtilesPath);
var id = path.basename(mbtilesPath)
var source = new mbtiles(mbtilesFile, function(err) {
  source.getInfo(function(err, info) {
    tileJSON['name'] = id;
    tileJSON['format'] = 'pbf';
    Object.assign(tileJSON, info);
    tileJSON['tilejson'] = '2.0.0';
    tileJSON['basename'] = id;
    tileJSON['filesize'] = fs.statSync(mbtilesFile)['size'];
    delete tileJSON['scheme'];
    fixTileJSONCenter(tileJSON);
  });

  geojsonToTiles(process.stdin, maxZoom, pattern)
    .pipe(through(function (tile) {
      var parts = tile.split('/')
      var z = parts[0]
      var x = parts[1]
      var y = parts[2]
      var streamSelf = this;
      var outputFile = outputDir + '/' + tile + '.pbf'
      if (fs.existsSync(outputFile)) {
        return
      }
      streamSelf.pause()
      source.getTile(z, x, y, function(err, data, headers) {
        if (err) {
          // console.error(err)
          streamSelf.resume()
          return
        }
        if (data == null) {
          // console.error('Not found')
          streamSelf.resume()
          return
        }
        zlib.gunzip(data, function (err, ungzipped) {
          if (err) {
            // console.error(err)
            streamSelf.resume()
            return
          }
          mkdirp(path.dirname(outputFile), function () {
            fs.writeFile(outputFile, ungzipped, function () {
              streamSelf.resume()
            })
          })
        })
      });
    }))
    .on('end', function () {
      tileJSON.tiles = [
        tilesURl
      ]
      fs.writeFileSync(outputDir + '/metadata.json', JSON.stringify(tileJSON, undefined, 2))
      console.log('Done')
    })
});