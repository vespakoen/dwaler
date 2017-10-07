var readline = require('readline')
var turfHelpers = require('@turf/helpers')
var turfDistance = require('@turf/distance')
var moment = require('moment')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

var feature
console.log('{"type": "FeatureCollection", "features": [')
console.log('{"type": "Feature", "geometry": {"type": "LineString", "coordinates": [')
var timestamps = []
var lastPoint = null
var lastTime = null
rl.on('line', function (line) {
  var parts = line.split(',')
  var ts = parts[0]
  timestamps.push(ts)
  var lat = parts[1]
  var lng = parts[2]
  var altitude = parts[3]
  var coord = [Number(lng), Number(lat), Number(altitude)]
  feature = JSON.stringify(coord)
  var thisPoint = turfHelpers.point(coord)
  var thisTime = moment(ts, "YYYYMMDDHHmmss")
  if (lastPoint) {
    var km = turfDistance(lastPoint, thisPoint, 'kilometers')
    // console.log(km * 1000)
    // var seconds = thisTime.unix() - lastTime.unix()
    const kmh = (km * 3600)
    if (kmh < 100) {
      console.log(feature + ',')
    }
  }
  lastPoint = thisPoint
  lastTime = thisTime
})
process.stdin.on('end', function () {
  console.log(feature)
  console.log(']}, "properties": ' + JSON.stringify({ timestamps: timestamps }) + '}]}')
})
