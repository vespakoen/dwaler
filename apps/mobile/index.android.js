/* eslint no-console: 0 */

import React, { Component } from 'react';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';
import usbSerial from 'react-native-usb-serial'
console.log(usbSerial)
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView
} from 'react-native';

class Dwaler extends Component {
  render() {
    StatusBar.setHidden(true);
    return (
      <View style={styles.container}>
        <Text>Hallo!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
});

AppRegistry.registerComponent('Dwaler', () => Dwaler);
