import turfDistance from 'turf-distance'
import turfPoint from 'turf-point'
import turfLineDistance from 'turf-line-distance'
import turfLinestring from 'turf-linestring'
import turfBearing from 'turf-bearing'

function getFastLine(origin, destination) {
  const simpleLine = turfLinestring([origin.geometry.coordinates, destination.geometry.coordinates])
  const distance = turfLineDistance(simpleLine, 'kilometers')
  const coordinates = []
  for (let i = 0; i < 20; i++) {
    var segment = turfAlong(simpleLine, i * (distance / 20), 'kilometers');
    coordinates.push(segment.geometry.coordinates);
  }
  coordinates.push(destination.geometry.coordinates)
  return turfLinestring(coordinates)
}

function closestPointIndex(line, point) {
  let shortestDist = Infinity
  let shortestDistIndex = 0
  line.geometry.coordinates.forEach((coord, i) => {
    const dist = turfDistance(turfPoint(coord), point)
    if (dist < shortestDist) {
      shortestDist = dist
      shortestDistIndex = i
    }
  })
  return shortestDistIndex
}

class Trace {
	constructor(options = {}) {
		this.start = options.start || null
		this.distanceTravelled = options.distanceTravelled || 0
		this.locationLog = options.locationLog || []
		this.timeLog = options.timeLog || []
		this.avgSpeed = 0
		this.hoursLeft = 0
		this.eta = new Date()
	}

	setTrail(trail) {
		this.trail = trail
		this.trailFeature = this.trail.features[0]
		this.trailCoordinates = this.trailFeature.geometry.coordinates
		this.totalDistance = turfLineDistance(this.trailFeature, 'kilometers')
		this.destination = this.trailCoordinates[this.trailCoordinates.length - 1]
	}

	hasTrail() {
		return !!this.trail
	}

	updateLocation(lngLat) {
		if (!this.hasTrail()) {
			return null
		}

		const now = new Date()
		if (this.locationLog.length > 0) {
			const lastLngLat = this.locationLog[this.locationLog.length - 1]
			const lastTime = this.timeLog[this.timeLog.length - 1]
			const secondsSinceLastUpdate = (now - lastTime) / 1000
			const lastDistanceTravelled = turfDistance(turfPoint(lngLat), turfPoint(lastLngLat), 'kilometers')
			this.speed = (3600 / secondsSinceLastUpdate) * lastDistanceTravelled
			this.distanceTravelled = this.distanceTravelled + lastDistanceTravelled
			this.direction = turfBearing(turfPoint(lastLngLat), turfPoint(lngLat))
			if (this.direction < 0) {
			  this.direction = 360 + this.direction
			}
		} else {
			this.start = lngLat
		}

        const closestIndex = closestPointIndex(this.trailFeature, turfPoint(lngLat))
        this.closestPoint = this.trailCoordinates[closestIndex]
        
        const lineTillEndCoords = this.trailCoordinates.slice(closestIndex)
        lineTillEndCoords.unshift(lngLat)
        const lineTillEnd = turfLinestring(lineTillEndCoords)
        this.distanceRemaining = turfLineDistance(lineTillEnd, 'kilometers')

        this.progress = (1 - (this.distanceRemaining / this.totalDistance)) * 100
        if (this.progress < 0) {
          this.progress = 0
        }

        this.locationLog.push(lngLat)
        this.timeLog.push(now)

        if (this.timeLog.length > 1) {
        	const travelTimeMs = this.timeLog[this.timeLog.length - 1] - this.timeLog[0]
	        this.avgSpeed = this.distanceTravelled / (travelTimeMs / 1000 / 60 / 60)

	        this.hoursLeft = this.distanceRemaining / this.avgSpeed
	        this.eta = new Date()
	        this.eta.setHours(this.eta.getHours() + this.hoursLeft)
        }
	}

	toJson() {
		return JSON.stringify(this)
	}
}

// router([
// 	[-122.01974287, 37.32543781],
// 	[-122.01971752, 37.32479063]
// ])
// .then(geojson => {
// 	const tiles = geojson2tiles(geojson, 14, 'neighbours')
// 	let chain = Promise.resolve()
// 	tiles.forEach(tile => {
// 		const tileParts = tile.split('/')
// 		chain = chain.then(() => {
// 			return RNFS.mkdir(`${RNFS.MainBundlePath}/www/map/${tileParts[0]}/${tileParts[1]}`)
// 				.then(() => {
// 					const token = 'pk.eyJ1IjoidmVzcGFrb2VuIiwiYSI6IldheG83a1kifQ.I1iQXvyeN8f-CLzp6EAQOQ'
// 					const url = `https://b.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7/${tile}.vector.pbf?access_token=${token}`
// 					console.log(url)
// 					const file = `${RNFS.MainBundlePath}/www/map/${tile}.pbf`
// 					console.log(file)
// 					return RNFS.downloadFile({
// 					  fromUrl: url,
// 					  toFile: file,
// 					  // headers: {
// 					  // 	'accept-encoding': 'gzip;q=0,deflate,sdch'
// 					  // }
// 					  // headers?: Headers;        // An object of headers to be passed to the server
// 					  // background?: boolean;
// 					  // progressDivider?: number;
// 					  // begin?: (res: DownloadBeginCallbackResult) => void;
// 					  // progress?: (res: DownloadProgressCallbackResult) => void;
// 					  // connectionTimeout?: number // only supported on Android yet
// 					  // readTimeout?: number       // only supported on Android yet
// 					})
// 					// return RNFS.writeFile(`${RNFS.MainBundlePath}/www/map/${tile}.pbf`, 'Lorem ipsum dolor sit amet', 'utf8')	
// 				})
// 				.then(res => {

// 				})
// 				.catch(err => console.log('error', err))		
// 		})
// 	})
// 	chain = chain.then(() => {
// 		console.log('done')
// 	})
// })


// const trace = new Trace()
// trace.setTrail({
// 	type: 'FeatureCollection',
// 	features: [
// 		{
// 			type: 'Feature',
// 			properties: {},
// 			geometry: {
// 				type: 'LineString',
// 				coordinates: [
// 					[15.235019, 44.118955, 11.0],
// 					[15.235130, 44.118550, 11.25],
// 					[15.235227, 44.117968, 11.0],
// 					[15.235230, 44.117955, 11.0],
// 					[15.235261, 44.117454, 10.5],
// 					[15.235346, 44.116850, 11.0],
// 					[15.235436, 44.116569, 11.25],
// 					[15.235762, 44.115931, 10.0],
// 					[15.236102, 44.115266, 5.75],
// 					[15.236264, 44.114793, 3.75],
// 					[15.236266, 44.114582, 3.5],
// 					[15.236164, 44.114274, 2.75],
// 					[15.235926, 44.113767, 4.5],
// 					[15.235916, 44.113620, 5.25],
// 					[15.236009, 44.113347, 6.75],
// 					[15.236284, 44.113066, 6.5]
// 				]
// 			}
// 		}
// 	]
// })

// console.log(trace)
// trace.updateLocation([15.235019, 44.118955])
// console.log(trace)
// setTimeout(() => {
// 	trace.updateLocation([15.235130, 44.118550])
// 	console.log(trace)
// }, 5000)

export default Trace
