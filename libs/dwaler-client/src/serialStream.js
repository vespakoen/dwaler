import SerialPort from 'serialport'

class SerialStream {
  static connect(device, baudRate = 115200) {
    return new Promise(resolve => {
      var serial = new SerialPort(device, {
        baudRate,
        parser: SerialPort.parsers.readline('\n')
      })
      serial.on('open', resolve(new SerialStream(serial)))
      serial.on('error', err => console.error('Error:', err))
    })
  }

  constructor(serial) {
    this.serial = serial
  }

  onEvent(cb) {
    this.serial.on('data', cb)
  }

  emitCommand(command) {
    this.serial.write(command, err => {
      if (err) {
        console.error('Error on write:', err)
        console.warn('Retrying in 1 second...')
        setTimeout(this.emitCommand.bind(this, command), 1000)
      }
    })
  }
}

export default SerialStream