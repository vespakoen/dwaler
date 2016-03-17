var fs = require('fs');
var exec = require('child_process').exec;

// yes, I know I can use a streaming CSV parser but I wanted to get a visual ASAP ;)
var blob = fs.readFileSync('./LOG.TXT').toString();
var lines = blob.split('\n');
lines.pop();
var geoJson = {
  type: 'LineString',
  coordinates: lines.map(function (line) {
    var cols = line.split(',');
    var latitude = Number(cols[0]);
    var longitude = Number(cols[1]);
    var altitude = Number(cols[2]);
    return [longitude, latitude, altitude];
  })
};
var geoJsonStr = JSON.stringify(geoJson);
console.log(geoJsonStr);
exec('xdg-open http://geojson.io/#data=data:application/json,' + encodeURIComponent(geoJsonStr));
