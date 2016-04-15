import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  image: {
    width: 100,
    height: 100
  },
  labels: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold'
  },
  traceCount: {
  }
})

class DestinationButton extends Component {
  constructor(props) {
    super(props)
    this.navigateTo = this.navigateTo.bind(this)
    this.state = {
    }
  }

  navigateTo() {
    this.props.navigateTo('destination', { destination: this.props.destination })
  }

  render() {
    const destination = this.props.destination
    const latLng = `${destination.location.latitude},${destination.location.longitude}`
    const markerUrl = `http://maps.googleapis.com/maps/api/staticmap?center=${latLng}&zoom=15&scale=2&size=100x100&maptype=terrain&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x000000%7Clabel:%7C${latLng}`
    return (
      <TouchableOpacity onPress={this.navigateTo}>
        <View style={styles.button}>
          <Image style={styles.image} source={{ uri: markerUrl }} />
          <View style={styles.labels}>
            <Text style={styles.title}>{destination.name}</Text>
            <Text style={styles.traceCount}>{destination.traceCount} {'trace' + (destination.traceCount > 1 ? 's' : '')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

DestinationButton.propTypes = {
  destination: React.PropTypes.object,
  navigateTo: React.PropTypes.func
}

export default DestinationButton
