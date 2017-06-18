/* eslint no-console: 0 */

import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import http from 'react-native-httpserver';
// import ActionButton from 'react-native-action-button';
import hsv2rgb from './src/util/hsv2rgb'
import Icon from 'react-native-vector-icons/MaterialIcons';
import btserial from 'react-native-bluetooth-serial'
// import dwaler from 'dwaler-client'
import Modal from 'react-native-modalbox'
import SettingsScene from './src/scenes/SettingsScene'
import ChangeDestinationScene from './src/scenes/ChangeDestinationScene'
import SaveLocationScene from './src/scenes/SaveLocationScene'
import geojson2tiles from './src/util/geojson2tiles'
import turfLineDistance from 'turf-line-distance'
import turfPointOnLine from 'turf-point-on-line'
import turfPoint from 'turf-point'
import turfDistance from 'turf-distance'
import turfLinestring from 'turf-linestring'
import turfAlong from 'turf-along'
import turfBearing from 'turf-bearing'

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

http.start({
  port: "9997",
  root: "BUNDLE"
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

class Dwaler extends Component {
  state = {
    center: {
      latitude: 50.799067,
      longitude: 5.731964
    },
    locationUpdateIndex: 0,
    zoom: 14,
    styleUrl: 'http://localhost:9997/outdoors.json',
    // styleUrl: 'http://localhost:9997/omt-outdoors.json',
    // styleUrl: 'mapbox://styles/mapbox/outdoors-v9',
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

  // componentDidMount = () => {
  //   setInterval(() => {
  //     this.setState({
  //       center: {
  //         // ...this.state.center,
  //         latitude: this.state.center.latitude - 0.001,
  //         longitude: this.state.center.longitude - 0.001
  //       }
  //     })
  //     this.onUpdateUserLocation(this.state.center)
  //   }, 1000)
  // };

  onPressSettings = () => {
    console.log('settings')
    this.refs.settingsModal.open();
  };

  onPressFlyToCurrentLocation = () => {
    console.log('flyToCurrentLocation')
    this._map.getCenterCoordinateZoomLevel(location => {
      console.log('location', location)
      setTimeout(() => {
        this._map.easeTo({
          latitude: location.latitude,
          longitude: location.longitude
        })
      }, 100)
    })
  };

  onPressSaveLocation = () => {
    console.log('saveLocation')
    this.refs.saveLocationModal.open();
  };

  onPressChangeDestination = () => {
    console.log('changeDestination')
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
    const currentLocation = [location.longitude, location.latitude]
    const secondsSinceLastUpdate = (new Date() - this.state.lastTime) / 1000
    if (this.state.currentLocation !== null) {
      const lastLocation = this.state.currentLocation
      // console.log('currentLocation', currentLocation)
      // console.log('lastLocation', lastLocation)
      const distanceTravelled = turfDistance(turfPoint(currentLocation), turfPoint(lastLocation), 'kilometers')
      // console.log('distance travelled', distanceTravelled)
      const speed = (3600 / secondsSinceLastUpdate) * distanceTravelled
      // console.log('speed', speed)
      const speeds = this.state.speeds
      if (this.state.locationUpdateIndex > 5) {
        speeds.push(speed)
        // moving average
        if (speeds.length > 60 * 60 * 5) {
          speeds.shift()
        }
        var totalSpeeds = speeds.reduce((speed, total) => {
          return total + speed
        }, 0)
        var avgSpeed = totalSpeeds / speeds.length
        // console.log('avgSpeed', avgSpeed)
      }
      const totalDistanceTravelled = this.state.totalDistanceTravelled + distanceTravelled
      // console.log('totalDistanceTravelled', totalDistanceTravelled)

      const update = {
        locationUpdateIndex: this.state.locationUpdateIndex + 1,
        currentLocation,
        totalDistanceTravelled,
        speed,
        avgSpeed,
        speeds,
        lastTime: new Date()
      }

      if (this.state.line && this.state.locationUpdateIndex % 5 === 0) {
        const lineCoords = this.state.line.geometry.coordinates
        const destination = lineCoords[lineCoords.length - 1]
        // const flightLine = getFastLine(turfPoint(currentLocation), turfPoint(destination))
        var closestIndex = closestPointIndex(this.state.line, turfPoint(currentLocation))
        // console.log('closestIndex', closestIndex)
        const closestPoint = lineCoords[closestIndex]
        const getBackLine = getFastLine(turfPoint(currentLocation), turfPoint(closestPoint))
        update.annotations = [
          {
            type: 'polyline',
            coordinates: getBackLine.geometry.coordinates.map(coord => [coord[1], coord[0]]),
            strokeColor: '#ff0000',
            strokeWidth: 4,
            alpha: 1,
            id: 'getBackLine'
          }
        ]

        const lineTillEndCoords = lineCoords.slice(closestIndex)
        lineTillEndCoords.unshift(currentLocation)
        const lineTillEnd = turfLinestring(lineTillEndCoords)
        const distanceRemaining = turfLineDistance(lineTillEnd, 'kilometers')
        // console.log('distance remaining', distanceRemaining)
        update.distanceRemaining = distanceRemaining
        let progress = (1 - (distanceRemaining / this.state.totalDistance)) * 100
        if (progress < 0) {
          progress = 0
        }
        // console.log('progress', progress)
        update.progress = progress
        const hoursLeft = distanceRemaining / this.state.avgSpeed
        // console.log('hours left', hoursLeft)
        update.hoursLeft = hoursLeft
        const eta = new Date()
        eta.setHours(eta.getHours() + hoursLeft)
        update.eta = eta
      }

      const mapUpdate = {}
      if (this.state.isTracking) {
        mapUpdate.latitude = location.latitude,
        mapUpdate.longitude = location.longitude
        if (speed > 5) {
          mapUpdate.direction = turfBearing(turfPoint(lastLocation), turfPoint(currentLocation))
          if (mapUpdate.direction < 0) {
            mapUpdate.direction = 360 + mapUpdate.direction
          }
        }
      }
      this.setState(update, () =>
        setTimeout(() =>
          this._map.easeTo(mapUpdate),
          100
        )
      )
    } else {
      this.setState({
        currentLocation,
        lastTime: new Date()
      })
    }
  };

  onPressZoomIn = () => {
    const zoom = this.state.zoom + 1 > 14 ? 14 : this.state.zoom + 1
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

  componentWillMount() {
    // dwaler.connect(btserial)
    //   .then(client => {
    //     console.log('got client', client)
    //     this.liveOff = client.live(e => {
    //       console.log('live', e)
    //     })
    //     client.getState(state => console.log('got state', state))
    //   })

    fetch('http://localhost:9997/noarmestreech.geojson')
      .then(res => res.json())
      .then(trip => {
        // console.log(trip)
        const line = trip.features[0]
        const totalDistance = turfLineDistance(trip.features[0], 'kilometers')
        // console.log('total distance', totalDistance)
        const lineCoordinates = line.geometry.coordinates
        const heights = line.geometry.coordinates
          .map(coord => coord[2])
        const heighest = Math.max.apply(Math, heights)
        const lowest = Math.min.apply(Math, heights)
        const totalLineCoordinates = lineCoordinates.length
        const heightMap = []
        let i = 0
        const skip = Math.floor(totalLineCoordinates / 50)
        while (i * skip < totalLineCoordinates) {
          const height = heights[i * skip]
          heightMap.push(Math.round(((height - lowest) / heighest) * 100))
          i++
        }
        this.setState({ heightMap, line, totalDistance })
      })
      .catch(function(ex) {
        console.error(ex)
      })
  }

  componentWillUnmount() {
    // this.liveOff()
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    const hottnessPercentage = 100
    const hottness = 0.3 - ((hottnessPercentage / 100) * 0.3)
    StatusBar.setHidden(true)
    // onChangeUserTrackingMode={this.onChangeUserTrackingMode}
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          maxZoomLevel={14}
          initialDirection={0}
          rotateEnabled
          scrollEnabled
          zoomEnabled
          showsUserLocation
          styleURL={Mapbox.mapStyles.dark}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onOpenAnnotation={this.onOpenAnnotation}
          onRegionDidChange={this.onRegionDidChange}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          styleURL={this.state.styleUrl}
        />
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
        <View style={[styles.heightProfile, {backgroundColor: hsv2rgb(hottness, 1, 1).replace(')', ',.8)').replace('rgb', 'rgba')}]}>
          { this.state.heightMap.map((height, i) => {
            const style = {marginTop: 58 - height * 0.58, height: height * 0.58}
            if (i === Math.round(this.state.progress / 2)) {
              style.backgroundColor = '#000'
            }
            return <View key={i} style={[styles.heightProfileBar, style]} />
          }) }
        </View>
        <View style={styles.infoBar}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>{Math.round(this.state.speed)}</Text>
            <Text style={styles.infoDescription}>km/h</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>{Math.round(this.state.avgSpeed * 10) / 10}</Text>
            <Text style={styles.infoDescription}>avg km/h</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>{Math.round(this.state.progress)}</Text>
            <Text style={styles.infoDescription}>%</Text>
          </View>
          <View style={[styles.infoItem, styles.lastInfoItem]}>
            <Text style={[styles.infoTitle]}>{Math.round(this.state.totalDistance * 10) / 10}</Text>
            <Text style={styles.infoDescription}>distance</Text>
          </View>
          {/* <View style={[styles.infoItem, styles.lastInfoItem]}>
            <Text style={[styles.infoTitle, {textAlign: 'left'}]}>{this.state.eta.toTimeString().substr(0, 5)}</Text>
            <Text style={styles.infoDescription}>ETA ({Math.round(this.state.hoursLeft)} hours)</Text>
          </View> */}
        </View>
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
        <SettingsScene ref="settingsModal" />
        <ChangeDestinationScene ref="changeDestinationModal" />
        <SaveLocationScene ref="saveLocationModal" />
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
