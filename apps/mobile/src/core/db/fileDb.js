import RNFS from 'react-native-fs'

class FileDB {
  constructor(path = `${RNFS.DocumentDirectoryPath}/db`) {
    this.path = path
  }

  get(table, key) {
    return RNFS.readFile(`${this.path}/${table}`)
      .catch(() => '{}')
      .then(text => JSON.parse(text))
      .then(json => json[key] || null)
  }

  getAll(table) {
    return RNFS.readFile(`${this.path}/${table}`)
      .catch(() => '{}')
      .then(text => JSON.parse(text))
  }

  put(table, key, value) {
    const filePath = `${this.path}/${table}`
    return RNFS.mkdir(this.path)
      .then(() => RNFS.readFile(filePath))
      .catch(() => '{}')
      .then(text => JSON.parse(text))
      .then(json => {
        json[key] = value
        return RNFS.writeFile(filePath, JSON.stringify(json), 'utf8')
      })
  }

  putAll(table, value) {
    const filePath = `${this.path}/${table}`
    return RNFS.mkdir(this.path)
      .then(() => RNFS.writeFile(filePath, JSON.stringify(value), 'utf8'))
  }

  del(table, key) {
    const filePath = `${this.path}/${table}`
    return RNFS.readFile(filePath)
      .catch(() => '{}')
      .then(text => JSON.parse(text))
      .then(json => {
        delete json[key]
        return RNFS.writeFile(filePath, JSON.stringify(json), 'utf8')
      })
  }
}

module.exports = FileDB