import SerialPort from 'serialport'

class SerialStream {
  static connect(device, baudRate = 115200) {
    return new Promise(resolve => {
      var serial = new SerialPort(device, {
        baudRate,
        parser: SerialPort.parsers.readline('\r\n')
      })
      serial.on('open', () =>
        setTimeout(() => {
          resolve(new SerialStream(serial))
        }, 2000)
      )
      serial.on('error', err => console.error('Error:', err))
    })
  }

  constructor(serial) {
    this.serial = serial
  }

  onEvent(cb) {
    this.serial.on('data', event => {
      console.log(`<- ${event}`)
      cb(event)
    })
  }

  emitCommand(command) {
    console.log(`-> ${command}`)
    this.serial.write(command + '\n', err => {
      if (err) {
        console.error('Error on write:', err)
        console.warn('Retrying in 1 second...')
        setTimeout(this.emitCommand.bind(this, command), 1000)
      }
    })
  }
}

export default SerialStream