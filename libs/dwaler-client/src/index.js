class DwalerClient {
  constructor(stream) {
    this.stream = stream
    stream.onEvent(this.onEvent.bind(this))
    this.cbs = {}
    this.headers = {}
  }

  getState(cb = null) {
    return this.emitCommand('state', [], cb)
  }

  startLive(cb = null) {
    const stopper = this.emitCommand('live', [], cb)
    return () => {
      this.emitCommand('liveoff', [], stopper, true)
    }
  }

  startRegular(cb = null) {
    const stopper = this.emitCommand('regular', [], cb)
    return () => {
      this.emitCommand('regularoff', [], stopper, true)
    }
  }

  getDestinations(onDestination = null) {
    return this.emitCommand('dests', [], onDestination)
  }

  getTripRows(destinationName, tripNum, onTripRow = null) {
    return this.emitCommand('trip', [destinationName, tripNum], onTripRow)
  }

  onEvent(event) {
    const dataParts = event.split(',')
    const commandId = dataParts[0]
    dataParts.shift()
    if (this.cbs[commandId]) {
      if (this.cbs[commandId].header) {
        const mappedEvent = {}
        const headerParts = this.cbs[commandId].header.split(',')
        headerParts.forEach((key, i) => {
          mappedEvent[key] = dataParts[i]
        })
        this.cbs[commandId](mappedEvent)
      } else {
        this.cbs[commandId](dataParts.join(','))
      }
    }
  }

  emitCommand(commandName, args = [], cb = null, skipHeader = false) {
    const commandId = Math.floor(Math.random() * 65535) // uint16_t max
    if (this.cbs[commandId]) return this.emitCommand(commandName, args, cb) // retry if commandId is already taken
    const argsStr = args.length > 0 ? ',' + args.join(',') : ''
    const command = `${commandId},${commandName}${argsStr}`
    if (cb !== null) {
      this.cbs[commandId] = cb
    }
    if (!this.headers[commandName] && !skipHeader) {
      var headerStop
      headerStop = this.emitCommand(`${commandName}h`, [], header => {
        this.cbs[commandId].header = header
        this.stream.emitCommand(command)
        headerStop()
      }, true)
    }
    this.stream.emitCommand(command)
    return () => {
      if (cb !== null) {
        delete this.cbs[commandId]
      }
    }
  }
}

export default DwalerClient
