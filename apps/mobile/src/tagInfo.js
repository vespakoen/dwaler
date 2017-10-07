module.exports = function searchTag(keyOrValue) {
  return fetch(`https://taginfo.openstreetmap.org/api/4/search/by_keyword?query=${keyOrValue}`)
    .then(res => res.json())
}