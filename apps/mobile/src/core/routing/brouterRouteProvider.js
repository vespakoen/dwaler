class BrouterRouteProvider {
  navigate(profile, stops) {
    const urlCoords = stops.map(coord => coord[0] + ',' + coord[1]).join('|')
    const url = `http://h2096617.stratoserver.net:443/brouter?lonlats=${urlCoords}&nogos=&profile=${profile}&alternativeidx=0&format=geojson`
    return fetch(url)
      .then(res => res.json())
      .catch(err => null)
  }
}

module.exports = BrouterRouteProvider