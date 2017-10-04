/* eslint no-console: 0 */

import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import http from 'react-native-httpserver';
import hsv2rgb from './src/util/hsv2rgb'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modalbox'
// import SettingsScene from './src/scenes/SettingsScene'
import ChangeDestinationScene from './src/scenes/ChangeDestinationScene'
// import SaveLocationScene from './src/scenes/SaveLocationScene'
import turfLineDistance from 'turf-line-distance'
import turfPointOnLine from 'turf-point-on-line'
import turfPoint from 'turf-point'
import turfDistance from 'turf-distance'
import turfLinestring from 'turf-linestring'
import turfAlong from 'turf-along'
import turfBearing from 'turf-bearing'
import Trace from './src/trace'

import RNGooglePlaces from 'react-native-google-places'

import geojson2tiles from './src/util/geojson2tiles'
import router from './src/router'
import download from './src/download'
import RNFS from 'react-native-fs'

import metadata from './src/metadata.json'
import updateStyle from './src/updateStyle'

import core from './src/core'

import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import queryOverpass from './src/queryOverpass'
import buffer from '@turf/buffer'
import simplify from '@turf/simplify'

import FileDB from './src/core/db/fileDb'
import BrouterRouteProvider from './src/core/routing/brouterRouteProvider'
import MapboxTileSource from './src/core/tile/mapboxTileSource'
import StyleManager from './src/core/style/styleManager'
import DataManager from './src/core/data/dataManager'
import Core from './src/core'

const db = new FileDB()
const routers = {
  brouter: new BrouterRouteProvider()
}
const tileSources = {
  mapbox: new MapboxTileSource()
}
const styleManager = new StyleManager(db)
const dataManager = new DataManager(db)
const dwaler = new Core(db, routers, tileSources, styleManager, dataManager)

http.start({
  port: "9997",
  root: "DOCS"
})

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

const maxZoom = 14

class Dwaler extends Component {
  constructor(props) {
    super(props)
    this.trace = new Trace()
  }

  state = {
    downloadProgress: 0,
    showMap: false,
    center: {
      latitude: 50.799067,
      longitude: 5.731964
    },
    locationUpdateIndex: 0,
    zoom: maxZoom,
    styleURL: 'http://localhost:9997/www/style.json',
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotations: [],
    currentLocation: null,
    lastLocation: null,
    avgSpeed: null,
    heightMap: [],
    speeds: [],
    speed: 0,
    progress: 0,
    lastTime: new Date(),
    isTracking: true,
    eta: new Date(),
    totalDistanceTravelled: 0
  };

  onPressSettings = () => {
    this.refs.settingsModal.open();
  };

  onPressFlyToCurrentLocation = () => {
    this._map.getCenterCoordinateZoomLevel(location => {
      setTimeout(() => {
        this._map.easeTo({
          latitude: location.latitude,
          longitude: location.longitude
        })
      }, 100)
    })
  };

  onPressSaveLocation = () => {
    this.refs.saveLocationModal.open();
  };

  onPressChangeDestination = () => {
    this.refs.changeDestinationModal.open();
  };

  onPressStartNavigation = () => {
    this.setState({
      isTracking: !this.state.isTracking
    })
  };

  onRegionDidChange = (location) => {
    this.setState({ zoom: location.zoomLevel })
  };

  onUpdateUserLocation = (location) => {
    this.setState({
      currentLocation: [location.longitude, location.latitude]
    })
    if (!this.trace.hasTrail()) return
    const lngLat = [location.longitude, location.latitude]
    this.trace.updateLocation(lngLat)

    const getBackLine = getFastLine(turfPoint(lngLat), turfPoint(this.trace.closestPoint))
    const update = {
      annotations: [
        {
          type: 'polyline',
          coordinates: getBackLine.geometry.coordinates.map(coord => [coord[1], coord[0]]),
          strokeColor: '#ff0000',
          strokeWidth: 4,
          alpha: 1,
          id: 'getBackLine'
        }
      ],
      distanceRemaining: this.trace.distanceRemaining,
      progress: this.trace.progress,
      hoursLeft: this.trace.hoursLeft,
      eta: this.trace.eta,
    }
    const mapUpdate = {}
    if (this.state.isTracking) {
      mapUpdate.latitude = location.latitude,
      mapUpdate.longitude = location.longitude
      if (this.trace.speed > 5) {
        mapUpdate.direction = this.trace.direction
      }
    }
    this.setState(update, () =>
      setTimeout(() =>
        this._map.easeTo(mapUpdate),
        100
      )
    )
  };

  onPressZoomIn = () => {
    const zoom = this.state.zoom + 1 > maxZoom ? maxZoom : this.state.zoom + 1
    this.setState({ zoom })
    this._map.easeTo({ zoomLevel: zoom })
  };

  onPressZoomOut = () => {
    const zoom = this.state.zoom - 1 < 0 ? 0 : this.state.zoom - 1
    this.setState({ zoom })
    this._map.easeTo({ zoomLevel: zoom })
  };

  onOpenAnnotation = (annotation) => {
    console.log('onOpenAnnotation', annotation)
  };

  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e)
  };

  onLongPress = (location) => {
    console.log('onLongPress', location)
  };

  onRegionDidChange = (location) => {
    this.setState({ zoom: location.zoomLevel })
  };

  onChangeDestination = (stops) => {
    console.log('onChangeDestination', stops)
    dwaler.addTrip('1', {
      router: {
        provider: 'brouter',
        profile: 'moped'
      },
      tiles: {
        provider: 'mapbox'
      },
      stops: stops,
      onProgress: (progress) => {
        this.setState({
          downloadProgress: progress
        })
      }
    })
    .then(() => {
      this.loadTrail()
      this.setState({
        showMap: false,
        downloadProgress: 0
      }, () => {
        this.setState({ showMap: true })
        console.log('Done!')
      })
    })
    .catch(err => {
      console.log(err)
      alert('Something went wrong while dowloading the new route...')
    })
  };

  loadTrail() {
    fetch('http://localhost:9997/www/track.geojson')
      .then(res => res.json())
      .then(trail => {
        this.trace.setTrail(trail)
        const heights = this.trace.trailCoordinates
          .map(coord => coord[2])
        const heighest = Math.max.apply(Math, heights)
        const lowest = Math.min.apply(Math, heights)
        const totalLineCoordinates = this.trace.trailCoordinates.length
        const heightMap = []
        let i = 0
        const skip = Math.floor(totalLineCoordinates / 50)
        while (i * skip < totalLineCoordinates) {
          const height = heights[i * skip]
          heightMap.push(lowest === heighest ? 0 : Math.round(((height - lowest) / heighest) * 100))
          i++
        }
        this.setState({
          showMap: true,
          heightMap
        })
      })
      .catch(function(ex) {
        console.error(ex)
      })
  }

  updateWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=6de3454ba570957e9f50b956f409bc6b&lat=${this.state.currentLocation[1]}&lon=${this.state.currentLocation[0]}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          weather: res
        })
      })
  }

  queryOverpass(key, value) {
    const simpleTrail = simplify(this.trace.trail, 0.01, false)
    const buffered = buffer(simpleTrail, 3000, 'meters')
    const reversedPoints = buffered.features[0].geometry.coordinates[0].map(coord => coord[1] + ' ' + coord[0])
    const pointsStr = reversedPoints.join(' ')
    var query = `node
      [${key}=${value}]
      (poly:"${pointsStr}");
    out body;`
    queryOverpass(query)
      .then(geojson => {
        console.log('got overpass result', geojson)
        return RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/www/extras.geojson`, JSON.stringify(geojson), 'utf8')
      })
      .then(() => {
        this.setState({
          showMap: false
        }, () => {
          this.setState({
            showMap: true
          })
        })
      })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(res => {
      console.log('got current position', res)
      this.setState({ currentLocation: [res.coords.longitude, res.coords.latitude] }, () => {
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/www/track.geojson`)
          .then((exists) => {
            if (exists) {
              return RNFS.exists(`${RNFS.DocumentDirectoryPath}/www/style.json`)
                .then(styleExists => {
                  // if (!styleExists) {
                    const sources = {
                      "composite": {
                        "url": "http://localhost:9997/www/map/metadata.json",
                        "type": "vector",
                        "minzoom": 0,
                        "maxzoom": 14
                      },
                      "route": {
                        "data": "http://localhost:9997/www/track.geojson",
                        "type": "geojson"
                      },
                      "extras": {
                        "data": "http://localhost:9997/www/extras.geojson",
                        "type": "geojson"
                      }
                    }
                    const layers = [
                      {
                        "id": "extras",
                        "type": "symbol",
                        "source": "extras",
                        "source-layer": "extras",
                        "minzoom": 5,
                        "layout": {
                          "text-line-height": 1.1,
                          "text-size": {
                            "base": 1,
                            "stops": [
                              [
                                16,
                                11
                              ],
                              [
                                20,
                                13
                              ]
                            ]
                          },
                          "icon-image": "{icon}",
                          "symbol-spacing": 250,
                          "text-font": [
                            "Open Sans Semibold"
                          ],
                          "text-offset": [
                            0,
                            0.85
                          ],
                          "text-rotation-alignment": "viewport",
                          "text-anchor": "top",
                          "text-field": {
                            "base": 1,
                            "stops": [
                              [
                                0,
                                ""
                              ],
                              [
                                5,
                                "{title}"
                              ]
                            ]
                          },
                          "text-letter-spacing": 0.01,
                          "icon-padding": 0,
                          "text-max-width": 7
                        },
                        "paint": {
                          "text-color": "#ff0000",
                          "text-halo-color": "hsl(0, 0%, 100%)",
                          "text-halo-width": 0.5,
                          "icon-halo-width": 4,
                          "icon-halo-color": "#fff",
                          "text-opacity": {
                            "base": 1,
                            "stops": [
                              [
                                13.99,
                                0
                              ],
                              [
                                14,
                                1
                              ]
                            ]
                          },
                          "text-halo-blur": 0.5
                        }
                      }
                    ]
                    return updateStyle(sources, layers)
                  // }
                })
                .then(() => this.loadTrail())
            }
          })
      })
    })
    this.interval = setInterval(() => {
      this.forceUpdate()
    }, 60000)
    // this.weatherInterval = setInterval(() => {
    //   updateWeather()
    // }, 1000 * 60 * 30)
    // updateWeather()
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    const hoursLeft = Math.floor(this.trace.hoursLeft)
    const minutesLeft = Math.round((this.trace.hoursLeft - Math.floor(this.trace.hoursLeft)) * 60)
    const prettyMinutesLeft = ("0" + minutesLeft).slice(-2)
    const hottnessPercentage = 100
    const hottness = 0.3 - ((hottnessPercentage / 100) * 0.3)
    StatusBar.setHidden(true)
    // onChangeUserTrackingMode={this.onChangeUserTrackingMode}
    const time = new Date()
    return (
      <View style={styles.container}>
        { this.state.showMap ? (
          <MapView
            ref={map => { this._map = map; }}
            style={styles.map}
            initialCenterCoordinate={this.state.center}
            initialZoomLevel={this.state.zoom}
            maxZoomLevel={maxZoom}
            initialDirection={0}
            rotateEnabled
            scrollEnabled
            zoomEnabled
            showsUserLocation
            userTrackingMode={this.state.userTrackingMode}
            annotations={this.state.annotations}
            annotationsAreImmutable
            onOpenAnnotation={this.onOpenAnnotation}
            onRegionDidChange={this.onRegionDidChange}
            onRightAnnotationTapped={this.onRightAnnotationTapped}
            onUpdateUserLocation={this.onUpdateUserLocation}
            onLongPress={this.onLongPress}
            styleURL={this.state.styleURL}
          />
        ) : null }
        <TouchableOpacity style={{position: 'absolute', top: 30, left: 30}} activeOpacity={0.85} onPress={this.onPressStartNavigation}>
          <View
            style={[styles.actionButton, {
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: '#fff'
            }]}
          >
            <Icon name={this.state.isTracking ? 'close' : 'navigation'} size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', top: 90, left: 30}} activeOpacity={0.85} onPress={this.onPressZoomIn}>
          <View
            style={[styles.actionButton, {
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: '#fff'
            }]}
          >
            <Icon name="add" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', top: 150, left: 30}} activeOpacity={0.85} onPress={this.onPressZoomOut}>
          <View
            style={[styles.actionButton, {
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: '#fff'
            }]}
          >
            <Icon name="remove" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', top: 210, left: 30}} activeOpacity={0.85} onPress={this.onPressChangeDestination}>
          <View
            style={[styles.actionButton, {
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: '#fff'
            }]}
          >
            <Icon name="search" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        {/*<TouchableOpacity style={{position: 'absolute', top: 270, left: 30}} activeOpacity={0.85} onPress={() => this.queryOverpass('building', 'house')}>
          <View
            style={[styles.actionButton, {
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: '#fff'
            }]}
          >
            <Icon name="add-location" size={24} color="#000" />
          </View>
        </TouchableOpacity>*/}
        <View style={[styles.heightProfile, {backgroundColor: hsv2rgb(hottness, 1, 1).replace(')', ',.8)').replace('rgb', 'rgba')}]}>
          { this.state.heightMap.map((height, i) => {
            const style = {marginTop: 58 - height * 0.58, height: height * 0.58}
            if (i === Math.round(this.state.progress / 2)) {
              style.backgroundColor = '#000'
            }
            return <View key={i} style={[styles.heightProfileBar, style]} />
          }) }
        </View>
        { this.state.downloadProgress === 0 ? (
          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>{("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2)}</Text>
              <Text style={styles.infoDescription}>time</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>{Math.round(this.trace.speed)}</Text>
              <Text style={styles.infoDescription}>km/h</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>{Math.round(this.trace.progress)}</Text>
              <Text style={styles.infoDescription}>%</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoTitle]}>{Math.round(this.trace.totalDistance * 10) / 10}</Text>
              <Text style={styles.infoDescription}>distance</Text>
            </View>
            <View style={[styles.infoItem, styles.lastInfoItem]}>
              <Text style={[styles.infoTitle]}>{hoursLeft}:{prettyMinutesLeft}</Text>
              <Text style={styles.infoDescription}>hours</Text>
            </View>
          </View>
        ) : (
          <View style={styles.infoBar}>
            <View style={[styles.infoItem, styles.lastInfoItem]}>
              <Text style={[styles.infoTitle]}>{ Math.round(this.state.downloadProgress * 100) }%</Text>
              <Text style={styles.infoDescription}>download progress</Text>
            </View>
          </View>
        ) }
        {/*<ActionButton buttonColor="rgba(0,0,0,1)">
          <ActionButton.Item buttonColor='#333' title="Settings" onPress={this.onPressSettings}>
            <Icon name="settings" size={24} color="#fff" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#333' title="Save location" onPress={this.onPressSaveLocation}>
            <Icon name="star-border" size={24} color="#fff" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#333' title="Change destination" onPress={this.onPressChangeDestination}>
            <Icon name="place" size={24} color="#fff" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#333' title={(this.state.userTrackingMode === Mapbox.userTrackingMode.follow ? 'Stop' : 'Start') + ' navigation'} onPress={this.onPressStartNavigation}>
            <Icon name="navigation" size={24} color="#fff" />
          </ActionButton.Item>
        </ActionButton>*/}
        {/*<SettingsScene ref="settingsModal" />*/}
        <ChangeDestinationScene
          currentLocation={this.state.currentLocation}
          ref="changeDestinationModal"
          onChangeDestination={this.onChangeDestination}
        />
        {/*<SaveLocationScene ref="saveLocationModal" />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  map: {
    flex: 1
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0, height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  heightProfile: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 58,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heightProfileBar: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 4
  },
  infoBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 58,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoItem: {
    marginLeft: 10,
    paddingLeft: 5,
    marginTop: 4,
    paddingTop: 4,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  lastInfoItem: {
    marginRight: 10
  },
  infoTitle: {
    fontSize: 21,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  infoDescription: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12
  }
});


AppRegistry.registerComponent('Dwaler', () => Dwaler);
