import xmldom from 'xmldom'
import querystring from 'querystring'
import osmtogeojson from 'osmtogeojson'

var XMLToGeoJSON = function (xml) {
  var parser = new xmldom.DOMParser();
  const data = parser.parseFromString(xml);
  const geojson = osmtogeojson(data, {
    flatProperties: true
  })
  geojson.features.forEach(feature => {
    feature.properties.icon = 'marker-15'
  })
  return geojson
}

module.exports = function queryOverpass(query) {
  return fetch('http://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({ data: query })
  })
  .then(res => res.text())
  .then(res => XMLToGeoJSON(res))
}