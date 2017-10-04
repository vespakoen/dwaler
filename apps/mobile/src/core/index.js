import geojson2tiles from '../util/geojson2tiles'
import RNFS from 'react-native-fs'

class Dwaler {
  constructor(db, routers, tileSources, styleManagers, dataManagers) {
    this.db = db
    this.routers = routers
    this.tileSources = tileSources
    this.styleManagers = styleManagers
    this.dataManagers = dataManagers
    this.state = {}
  }

  getState() {
    return this.db.getAll('state')
  }

  mergeState(newState) {
    return this.getState()
      .then(state => {
        Object.keys(newState).forEach(key => {
          state[key] = newState[key]
        })
        return this.setState(state)
      })
  }

  setState(state) {
    return this.db.putAll('state', state)
  }

  getTrip(tripId) {
    return this.db.get('trips', tripId)
  }

  putTrip(tripId, trip) {
    return this.db.put('trips', tripId, trip)
  }

  syncTiles(provider, tiles, onProgress) {
    return this.tileManager.syncTiles(provider, tiles, onProgress)
  }
  
  addTrip(tripId, opts) {
    console.log('adding trip', ...arguments)
    const trip = {
      id: tripId,
      ...opts
    }
    return this.routers[opts.router.provider].navigate(opts.router.profile, opts.stops)
      .then(route => {
        if (!route) {
          throw new Error('Could not find route to this place')
        }
        console.log('got route', route)
        trip.route = route
        return geojson2tiles(route, opts.tiles.maxZoom || 14, 'neighbours')
      })
      .then(tiles => {
        console.log('got tiles', tiles)
        trip.tiles = tiles
        return this.syncTiles(opts.tiles.provider, tiles, opts.onProgress)
      })
      .then(() => this.putTrip(tripId, trip))
      .then(() => {
        return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/www`)
          .then(() => {
            return RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/www/track.geojson`, JSON.stringify(trip.route), 'utf8')
              .catch(err => { console.log('unable to create track file', err)})
          })
      })
      .then(() => this.setState({
        activeTripId: tripId
      }))
  }

  syncTiles(tileSourceId, tiles, onProgress) {
    const toDownload = []
    const toRemove = []
    return this.db.get('tiles', tileSourceId)
      .then(currentTiles => {
        console.log('currentTiles', currentTiles)
        if (!currentTiles) {
          currentTiles = {}
        }
        Object.keys(tiles).forEach(z => {
          Object.keys(tiles[z]).forEach(x => {
            Object.keys(tiles[z][x]).forEach(y => {
              if (!currentTiles[z] || !currentTiles[z][x] || !currentTiles[z][x][y]) {
                toDownload.push(`${z}/${x}/${y}`)
              }
            })
          })
        })
        Object.keys(currentTiles).forEach(z => {
          Object.keys(currentTiles[z]).forEach(x => {
            Object.keys(currentTiles[z][x]).forEach(y => {
              if (!tiles[z] || !tiles[z][x] || !tiles[z][x][y]) {
                toRemove.push(`${z}/${x}/${y}`)
              }
            })
          })
        })
        console.log('toRemove', toRemove)
        console.log('toDownload', toDownload)
        const tileSource = this.tileSources[tileSourceId]
        return tileSource.remove(toRemove)
          .then(() => tileSource.download(toDownload, onProgress))
          .then(() => this.db.put('tiles', tileSourceId, tiles))
      })
  }
}

export default Dwaler

