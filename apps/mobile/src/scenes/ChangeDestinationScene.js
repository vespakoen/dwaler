import React, {
  Component
} from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'

import Modal from 'react-native-modalbox'

class ChangeDestinationScene extends Component {
  state = {
    destination: ''
  }

  open() {
    this.refs.modal.open()
  }

  render() {
    return (
      <Modal style={styles.modal} ref="modal" swipeToClose={true} onClosed={() => console.log('closed')} onOpened={() => {}} onClosingState={() => {}}>
        <Text style={styles.modalTitle}>Change destination</Text>
        <Text style={styles.inputLabel}>LOCATION:</Text>
        <TextInput style={styles.input} value={String(this.state.destination)} onChangeText={(text) => this.setState({destination: text})} />
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
  }
});

export default ChangeDestinationScene
