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

class SaveLocationScene extends Component {
  state = {
    note: ''
  }

  open() {
    this.refs.modal.open()
  }

  render() {
    return (
      <Modal style={styles.modal} ref="modal" swipeToClose={true} onClosed={() => console.log('closed')} onOpened={() => {}} onClosingState={() => {}}>
        <Text style={styles.modalTitle}>Save current location</Text>
        <Text style={styles.inputLabel}>NOTE:</Text>
        <TextInput style={styles.input} value={String(this.state.note)} onChangeText={(text) => this.setState({note: text})} multiline={true} />
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
    height: 120,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default SaveLocationScene
