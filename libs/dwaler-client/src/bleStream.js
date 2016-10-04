class BLEStream {
  static connect(btserial) {
    this.btserial = btserial
    return new Promise(resolve => {
      const scanTimer = setInterval(() => {
        btserial.listDevices((err, devices) => {
          console.log(devices)
          devices.forEach(device => {
            if (device.name === 'Dwaler') {
              clearInterval(scanTimer)
              btserial.connect(device.uuid, (err, status, deviceName) => {
                resolve(new BLEStream(btserial))
              })
            }
          })
        })
      }, 5000)
    })
  }

  constructor(btserial) {
    this.btserial = btserial
  }

  onEvent(cb) {
    this.btserial.setDataAvailableCallback(e => {
      this.btserial.read((err, string) => {
        if (!err) {
          const event = string.replace('\r\n', '')
          console.log(`<- ${event}`)
          cb(event)
        }
      })
    })
  }

  emitCommand(command) {
    console.log(`-> ${command}`)
    this.btserial.write(command, err => {
      if (err) {
        console.error('Error on write:', err)
        console.warn('Retrying in 1 second...')
        setTimeout(this.emitCommand.bind(this, command), 1000)
      }
    })
  }
}

export default BLEStream