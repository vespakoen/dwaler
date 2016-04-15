import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native'
import MapView from '../components/MapView'
import TraceSelector from '../components/TraceSelector'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192633'
  },
  map: {
    flex: 1
  },
  destination: {
    flex: 1
  }
})

class Destination extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const destination = this.props.destination
    return (
      <View style={styles.container}>
        <MapView
          ref="TRIPMAP"
          style={styles.map}
          center={destination.location}
          zoomLevel={10}
          annotations={[
            {
              type: 'point',
              coordinates: [destination.location.latitude, destination.location.longitude]
            }
          ]}
        />
        <View style={styles.destination}>
          <TraceSelector
            destination={destination}
            connection={this.props.connection}
            navigateTo={this.props.navigateTo}
          />
        </View>
      </View>
    )
  }
}

Destination.propTypes = {
  destination: React.PropTypes.object,
  connection: React.PropTypes.object,
  navigateTo: React.PropTypes.func
}

export default Destination
