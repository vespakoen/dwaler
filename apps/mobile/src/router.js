module.exports = function route(coords, profile = 'moped') {
	const urlCoords = coords.map(coord => coord[0] + ',' + coord[1]).join('|')
	const url = `http://h2096617.stratoserver.net:443/brouter?lonlats=${urlCoords}&nogos=&profile=${profile}&alternativeidx=0&format=geojson`
	return fetch(url)
		.then(res => res.json())
}