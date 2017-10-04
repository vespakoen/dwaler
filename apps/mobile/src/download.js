import geojson2tiles from '../src/util/geojson2tiles'
import router from '../src/router'
import RNFS from 'react-native-fs'

let lastProgressReport = new Date()
module.exports = function download(tiles, onProgress) {
	let chain = Promise.resolve()
	tiles.forEach((tile, i) => {
		const tileParts = tile.split('/')
		chain = chain.then(() => {
			return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/www/map/${tileParts[0]}/${tileParts[1]}`)
				.then(() => {
					const token = 'pk.eyJ1IjoidmVzcGFrb2VuIiwiYSI6IldheG83a1kifQ.I1iQXvyeN8f-CLzp6EAQOQ'
					const url = `https://b.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7/${tile}.vector.pbf?access_token=${token}`
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