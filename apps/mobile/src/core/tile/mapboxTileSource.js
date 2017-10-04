import RNFS from 'react-native-fs'

let lastProgressReport = new Date()
class MapboxTileSource {
  constructor(token = 'pk.eyJ1IjoidmVzcGFrb2VuIiwiYSI6IldheG83a1kifQ.I1iQXvyeN8f-CLzp6EAQOQ') {
    this.name = 'mapbox'
    this.token = token
  }

  download(tiles, onProgress) {
    let chain = Promise.resolve()
    tiles.forEach((tile, i) => {
      const tileParts = tile.split('/')
      chain = chain.then(() => {
        return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/www/map/${tileParts[0]}/${tileParts[1]}`)
          .then(() => {
            const url = `https://b.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7/${tile}.vector.pbf?access_token=${this.token}`
            console.log(url)
            const file = `${RNFS.DocumentDirectoryPath}/www/map/${tile}.pbf`
            console.log(file)
            return RNFS.downloadFile({
              fromUrl: url,
              toFile: file,
              headers: {
                'accept-encoding': 'gzip;q=0,deflate,sdch'
              }//,
              // background: true
              // background?: boolean;
              // progressDivider?: number;
              // begin?: (res: DownloadBeginCallbackResult) => void;
              // progress?: (res: DownloadProgressCallbackResult) => void;
              // connectionTimeout?: number // only supported on Android yet
              // readTimeout?: number       // only supported on Android yet
            }).promise.catch(err => console.log(err))    
          })
          .then(() => {
            const now = new Date()
            if ((now - lastProgressReport) > 500) {
              lastProgressReport = now
              onProgress && onProgress((i + 1) / tiles.length)
            }
          })
          .catch(err => console.log(err))
      })
    })
    return chain
  }

  remove(tiles) {
    return Promise.all(tiles.map(tile => {
      return RNFS.unlink(`${RNFS.DocumentDirectoryPath}/www/map/${tile}.pbf`)
        .catch(err => {})
    }))
  }
}

module.exports = MapboxTileSource