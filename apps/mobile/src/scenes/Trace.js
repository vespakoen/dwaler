import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import moment from 'moment'
import point from 'turf-point'
import distance from 'turf-distance'
import MapView from '../components/MapView'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192633'
  },
  map: {
    flex: 1
  },
  trace: {
    flex: 1,
    padding: 10
  },
  tr: {
    flex: 1,
    flexDirection: 'row'
  },
  td: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
  label: {
    flex: 1,
    color: '#c0c0c0'
  },
  value: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 23,
    color: '#ffffff'
  }
})

class Trace extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const trace = this.props.trace
    setTimeout(() => {
      this.refs.TRACEMAP.setBounds(trace.bbox, 50)
    }, 200)
  }

  render() {
    const trace = this.props.trace
    const mStartTime = moment.unix(trace.startTime)
    const mEndTime = moment.unix(trace.endTime)
    const coords = trace.annotations[0].coordinates
    const centerCoord = coords[Math.floor(coords.length / 2)]
    const center = {
      latitude: centerCoord[0],
      longitude: centerCoord[1]
    }
    const startCoord = trace.coords[0]
    const endCoord = trace.coords[coords.length - 1]
    const flightDistance = distance(
      point([startCoord.longitude, startCoord.latitude]),
      point([endCoord.longitude, endCoord.latitude]),
      'kilometers'
    )
    return (
      <View style={styles.container}>
        <MapView
          ref="TRACEMAP"
          style={styles.map}
          center={center}
          zoomLevel={10}
          annotations={trace.annotations}
        />
        <ScrollView>
          <View style={styles.trace}>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.label}>Distance travelled:</Text>
                <Text style={styles.value}>{Math.round(trace.distance * 1000) / 1000} km</Text>
              </View>
              <View style={styles.td}>
                <Text style={styles.label}>Flight distance:</Text>
                <Text style={styles.value}>{Math.round(flightDistance * 1000) / 1000} km</Text>
              </View>
            </View>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.label}>Top speed:</Text>
                <Text style={styles.value}>{Math.round(trace.topSpeed.speed * 100) / 100} km/h</Text>
              </View>
              <View style={styles.td}>
                <Text style={styles.label}>Average speed:</Text>
                <Text style={styles.value}>{Math.round(trace.avgSpeed * 100) / 100} km/h</Text>
              </View>
            </View>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.label}>Top Temperature:</Text>
                <Text style={styles.value}>{Math.round(trace.topTemp.temp * 100) / 100} °C</Text>
              </View>
              <View style={styles.td}>
                <Text style={styles.label}>Average Temperature:</Text>
                <Text style={styles.value}>{Math.round(trace.avgTemp * 100) / 100} °C</Text>
              </View>
            </View>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.label}>Top RPM:</Text>
                <Text style={styles.value}>{Math.round(trace.topRpm.rpm)}</Text>
              </View>
              <View style={styles.td}>
                <Text style={styles.label}>Average RPM:</Text>
                <Text style={styles.value}>{Math.round(trace.avgRpm * 100) / 100}</Text>
              </View>
            </View>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.label}>Start date:</Text>
                <Text style={styles.value}>{ mStartTime.format('YYYY-MM-DD') }</Text>
                <Text style={styles.label}>Start time:</Text>
                <Text style={styles.value}>{ mStartTime.format('HH:mm:ss') }</Text>
              </View>
              <View style={styles.td}>
                <Text style={styles.label}>End date:</Text>
                <Text style={styles.value}>{ mEndTime.format('YYYY-MM-DD') }</Text>
                <Text style={styles.label}>End time:</Text>
                <Text style={styles.value}>{ mEndTime.format('HH:mm:ss') }</Text>
              </View>
            </View>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.label}>Duration:</Text>
                <Text style={styles.value}>{ moment.duration(mStartTime.diff(mEndTime)).humanize() }</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

Trace.propTypes = {
  trace: React.PropTypes.object
}

export default Trace
