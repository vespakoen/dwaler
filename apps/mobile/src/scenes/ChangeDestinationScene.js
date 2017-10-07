import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNGooglePlaces from 'react-native-google-places'

class ChangeDestinationScene extends Component {
  state = {
    stops: []
  }

  constructor(props) {
    super(props)
    this.addStop = this.addStop.bind(this)
    this.navigate = this.navigate.bind(this)
  }

  open() {
    this.refs.modal.open()
    this.addStop()
  }

  addStop() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
          stops: [...this.state.stops, place]
        })
        console.log('place', place);
        console.log('coords', [
          this.state.currentLocation,
          [place.longitude, place.latitude]
        ])
      })
  }

  removeStop(placeId) {
    this.setState({
      stops: this.state.stops.filter(stop => stop.placeID !== placeId)
    })
  }

  navigate() {
    const stops = this.state.stops.map(stop => [stop.longitude, stop.latitude])
    stops.unshift(this.props.currentLocation)
    this.setState({
      stops: []
    })
    this.refs.modal.close()
    this.props.onChangeDestination(stops)
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        ref="modal"
        swipeToClose={true}
        onClosed={() => console.log('closed')}
        onOpened={() => {}}
        onClosingState={() => {}}
      >
        { this.state.stops.map(stop => {
          return (
            <View
              key={stop.placeID}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 20 }}>{stop.name}</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={this.removeStop.bind(this, stop.placeID)}
              >
                <View
                  style={[styles.actionButton, {
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    backgroundColor: '#fff'
                  }]}
                >
                  <Icon name="close" size={24} color="#000" />
                </View>
              </TouchableOpacity>
            </View>
          )
        }) }
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity activeOpacity={0.85} onPress={this.addStop}>
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
          <TouchableOpacity activeOpacity={0.85} onPress={this.navigate}>
            <View
              style={[styles.actionButton, {
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                backgroundColor: '#ff0000'
              }]}
            >
              <Icon name="keyboard-arrow-right" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    padding: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  inputLabel: {
    color: '#888',
    marginBottom: 3
  },
  input: {
    height: 40,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1
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
  }
});

export default ChangeDestinationScene
