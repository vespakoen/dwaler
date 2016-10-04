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

class SettingsScene extends Component {
  state = {
    averageSpeed: 0
  }

  open() {
    this.refs.modal.open()
  }

  render() {
    return (
      <Modal style={styles.modal} ref="modal" swipeToClose={true} onClosed={() => console.log('closed')} onOpened={() => {}} onClosingState={() => {}}>
        <Text style={styles.modalTitle}>Settings</Text>
        <Text style={styles.inputLabel}>AVERAGE SPEED (KM/H):</Text>
        <TextInput style={styles.input} value={String(this.state.averageSpeed)} onChangeText={(text) => this.setState({averageSpeed: text})} />
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

export default SettingsScene
