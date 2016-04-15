import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#c0c0c0'
  },
  title: {
    fontWeight: 'bold'
  },
  traceCount: {
  }
})

class TraceButton extends Component {
  constructor(props) {
    super(props)
    this.navigateTo = this.navigateTo.bind(this)
    this.state = {
    }
  }

  navigateTo() {
    this.props.navigateTo('trace', {
      trip: this.props.trip,
      trace: this.props.trace
    })
  }

  render() {
    const trip = this.props.trip
    const trace = this.props.trace
    return (
      <TouchableOpacity onPress={this.navigateTo}>
        <View style={styles.button}>
          <Text style={styles.title}>{Math.round(trace.distance * 1000) / 1000} KM</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default TraceButton
