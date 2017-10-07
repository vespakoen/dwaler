import RNFS from 'react-native-fs'
import baseStyles from './baseStyles'

module.exports = function updateStyle(sources, layers, fromStyle = 'outdoors') {
  const newStyle = JSON.parse(JSON.stringify(baseStyles[fromStyle]))
  newStyle.sources = sources
  newStyle.layers = newStyle.layers.concat(layers)
  return RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/www/style.json`, JSON.stringify(newStyle), 'utf8')
}