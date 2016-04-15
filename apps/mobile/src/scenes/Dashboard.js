import React, {
  Component,
  StyleSheet,
  View
} from 'react-native'
import MapView from '../components/MapView'
import DestinationSelector from '../components/DestinationSelector'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192633'
  },
  map: {
    flex: 1
  },
  lcd: {
    flex: 1
  }
})

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeScreen: null,
      destinationName: null,
      startingLocation: null,
      destinationLocation: null,
      currentLocation: null,
      topSpeed: null,
      travelledDistance: null
    }
  }

  componentDidMount() {
    const dwaler = this.props.connection
    const getUpdates = () => {
      dwaler.getState().then(state => this.setState(state))
    }
    this.timer = setInterval(getUpdates, 1500)
    getUpdates()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  renderLCD() {
    switch (this.state.activeScreen) {
      case 255:
        return (
          <DestinationSelector
            connection={this.props.connection}
            navigateTo={this.props.navigateTo}
          />
        )
      default:
        return null
    }
  }

  render() {
    if (this.state.currentLocation === null) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <MapView
          ref="DASHBOARDMAP"
          center={this.state.currentLocation}
          tilt={90}
          direction={this.state.heading}
          zoomLevel={16}
          annotations={[
            {
              type: 'polyline',
              coordinates: [
                [
                  this.state.currentLocation.latitude,
                  this.state.currentLocation.longitude
                ],
                [
                  this.state.destinationLocation.latitude,
                  this.state.destinationLocation.longitude
                ]
              ],
              strokeColor: '#1f3a5d',
              strokeWidth: 5,
              alpha: 0.7,
              id: `${this.state.destinationName}-${this.state.traceNum}`
            },
            {
              type: 'point',
              coordinates: [
                this.state.startingLocation.latitude,
                this.state.startingLocation.longitude
              ],
              annotationImage: {
                url: 'http://s9.postimg.org/jeubfcmcf/start.png',
                width: 53,
                height: 103
              }
            },
            {
              type: 'point',
              coordinates: [
                this.state.currentLocation.latitude,
                this.state.currentLocation.longitude
              ],
              annotationImage: {
                url: 'http://s9.postimg.org/5vdh9n8db/end.png',
                width: 53,
                height: 103
              }
            }
          ]}
          style={styles.map}
        />
        <View style={styles.lcd}>
          { this.state.activeScreen ? this.renderLCD() : null }
        </View>
      </View>
    )
  }
}

Dashboard.propTypes = {
  connection: React.PropTypes.object,
  navigateTo: React.PropTypes.func
}

export default Dashboard
