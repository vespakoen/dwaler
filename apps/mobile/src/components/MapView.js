import React, {
  StyleSheet,
  View
} from 'react-native'
import Mapbox from 'react-native-mapbox-gl'
import config from '../../config'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const MapView = React.createClass({
  mixins: [Mapbox.Mixin],

  getInitialState() {
    return {
      center: this.props.center || {
        latitude: 40.7223,
        longitude: -73.9878
      },
      annotations: this.props.annotations || []
    }
  },

  componentDidMount() {
    if (this.props.tilt) {
      console.log('SETTING TILT', this.props.tilt)
      this.tiltTimer = setTimeout(() => this.setTilt('MAP', this.props.tilt), 10)
    }
    if (this.props.direction) {
      this.directionTimer = setTimeout(() => this.setDirectionAnimated('MAP', this.props.direction), 10)
    }
  },

  componentWillUnmount() {
    if (this.tiltTimer) clearTimeout(this.tiltTimer)
    if (this.directionTimer) clearTimeout(this.directionTimer)
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.direction !== nextProps.direction) {
      this.setDirectionAnimated('MAP', nextProps.direction)
    }
    if (nextProps.center) {
      this.setCenterCoordinateAnimated('MAP', nextProps.center.latitude, nextProps.center.longitude)
    }
    if (nextProps.tilt) {
      console.log('SETTING TILT', nextProps.tilt)
      this.setTilt('MAP', nextProps.tilt)
    }
  },

  setAnnotations(annotations) {
    this.removeAllAnnotations('MAP')
    this.addAnnotations('MAP', annotations)
  },

  setBounds(bbox, padding = 10) {
    this.setVisibleCoordinateBoundsAnimated('MAP', bbox[1], bbox[0], bbox[3], bbox[2], padding, padding, padding, padding)
  },

  render() {
    return (
      <View style={styles.container}>
        <Mapbox
          ref={'MAP'}
          style={styles.container}
          accessToken={config.MAPBOX_ACCESS_TOKEN}
          styleURL="mapbox://styles/mapbox/streets-v8"
          annotations={this.state.annotations}
          centerCoordinate={this.state.center}
          debugActive={false}
          rotateEnabled
          scrollEnabled
          showsUserLocation={false}
          zoomEnabled
          compassIsHidden={false}
          onRegionChange={this.onRegionChange}
          onUserLocationChange={this.onUserLocationChange}
          onLongPress={this.onLongPress}
          onOpenAnnotation={this.onOpenAnnotation}
          {...this.props}
        />
      </View>
    )
  }
})

export default MapView
