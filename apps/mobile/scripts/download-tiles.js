var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var through = require('through');
var request = require('request');
var zlib = require('zlib');
var geojsonToTiles = require('./geojson-to-tiles')

// var maxZoom = Number(process.env.MAXZOOM);
// // var token = process.env.MAPBOX_ACCESS_TOKEN;
// // var url = 'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6';
// // var ext = '.vector.pbf?access_token=' + token;
// var outputDir = process.env.OUTPUT_DIR;
// var outputExt = process.env.OUTPUT_EXT || '.pbf';
// var url = process.env.TILES_URL ? process.env.TILES_URL : 'https://tiles.dwaler.com/data/osm2vectortiles';

var maxZoom = 14;
var pattern = 'features.*.geometry.coordinates.*'
var outputDir = '../ios/www/map'
// var url = 'https://tiles.dwaler.com/data/osm2vectortiles'
var url = 'http://osm2vectortiles-3.tileserver.com/v2'
var ext = '.pbf'
var tilesURl = 'http://localhost:9997/' + path.basename(outputDir) + '/{z}/{x}/{y}.pbf'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

geojsonToTiles(process.stdin, maxZoom, pattern, 'neighbours')
  .pipe(through(function (tile) {
    var parts = tile.split('/')
    var z = parts[0]
    var x = parts[1]
    var y = parts[2]
    var streamSelf = this;
    var dlUrl = url + '/' + z + '/' + x + '/' + y + ext
    var outputFile = outputDir + '/' + tile + '.pbf'
    if (fs.existsSync(outputFile)) {
      return
    }
    streamSelf.pause()
    request.get(dlUrl, {encoding: null}, function (err, resp, body) {
      if (err) {
        console.log(err)
        streamSelf.resume()
        return
      }
      if (body === 'Tile does not exist') {
        streamSelf.resume()
        return
      }
      zlib.gunzip(body, function (err, ungzipped) {
        mkdirp(path.dirname(outputFile), function () {
          fs.writeFile(outputFile, ungzipped, function () {
            setTimeout(function () {
              streamSelf.resume()
            }, 20)
          })
        })
      })
    });
  }))
  .on('end', function () {
    console.log('Done')
  })