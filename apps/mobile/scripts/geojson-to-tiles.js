var through = require('through');
var JSONStream = require('JSONStream');

function lng2tile(lng, zoom) {
  return (Math.floor((lng+180)/360*Math.pow(2,zoom)));
}

function lat2tile(lat, zoom) {
  return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}

module.exports = function (stream, maxZoom, pattern, stategy) {
  var parseFeatures = JSONStream.parse(pattern);
  var tiles = {};
  var emitTiles = through(function (coordinate) {
    for (i = 0; i <= maxZoom; i++) {
      var z = i;
      var x = lng2tile(coordinate[0], z);
      var y = lat2tile(coordinate[1], z);
      if (stategy === 'neighbours') {
        // add tile and neighbours
        for (xp = -1; xp < 2; xp++) {
          for (yp = -1; yp < 2; yp++) {
            if (x + xp < 0 || y + yp < 0) continue;
            if (z === 0 && (y + xp > 0 || x + xp > 0)) continue;
            if (z === 1 && (y + xp > 1 || x + xp > 1)) continue;
            if ( ! tiles[z + '/' + (x + xp) + '/' + (y + yp)]) {
              tiles[z + '/' + (x + xp) + '/' + (y + yp)] = true;
              this.emit('data', z + '/' + (x + xp) + '/' + (y + yp))
            }
          }
        }
      } else {
        // // add tile
        if ( ! tiles[z + '-' + x + '-' + y]) {
          tiles[z + '-' + x + '-' + y] = true
          this.emit('data', z + '/' + x + '/' + y)
        }
      }
    }
  });

  return stream
    .pipe(parseFeatures)
    .pipe(emitTiles)
}