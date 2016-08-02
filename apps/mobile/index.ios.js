/* eslint no-console: 0 */

import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import http from 'react-native-httpserver';
// import btserial from 'react-native-bluetooth-serial'
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView
} from 'react-native';

http.start({
  port: "9997",
  root: "BUNDLE"
});

// btserial.list()
  // .then(console.log.bind(console))

const accessToken = 'pk.eyJ1IjoiZ3JhZmEiLCJhIjoiY2lvZjU0NnRqMDB0cnVwbTM3MmZjeGxxZiJ9.HG76QROZVWnTf9jQ9ZKWDw';
Mapbox.setAccessToken(accessToken);

class Dwaler extends Component {
  state = {
    center: {
      latitude: 52.5156579,
      longitude: 13.3548103
    },
    zoom: 14,
    styleUrl: 'assets://style.json',
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotations: []
  };
  onUpdateUserLocation = (location) => {
    console.log('onUpdateUserLocation', location);
  };
  onOpenAnnotation = (annotation) => {
    console.log('onOpenAnnotation', annotation);
  };
  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e);
  };
  onLongPress = (location) => {
    console.log('onLongPress', location);
  };

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    StatusBar.setHidden(true);
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          maxZoomLevel={14}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          styleURL={Mapbox.mapStyles.dark}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          styleURL={'asset://assets/style.json'}
        />
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
  }
});

AppRegistry.registerComponent('Dwaler', () => Dwaler);
