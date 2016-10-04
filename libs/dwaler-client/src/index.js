import debug from './debug'
const log = debug('DwalerClient')

class DwalerClient {
  constructor(stream) {
    this.stream = stream
    stream.onEvent(this.onEvent.bind(this))
    this.cbs = {}
    this.headers = {}
  }

  getState(cb = null) {
    const commandId = this.emitCommand('state', [], cb)
    return () => {
      delete this.cbs[commandId]
    }
  }

  live(cb = null) {
    const commandId = this.emitCommand('live', [], cb)
    return () => {
      this.emitCommand('liveoff', [], null, true)
    }
  }

  getDestinations(onDestination = null) {
    this.emitCommand('dests', [], onDestination)
  }

  getTrips(destinationName, onTrip = null) {
    this.emitCommand('trips', [destinationName], onTrip)
  }

  getTripRows(destinationName, tripNum, onTripRow = null) {
    const commandId = this.emitCommand('trip', [destinationName, tripNum], onTripRow)
    return () => {
      delete this.cbs[commandId]
    }
  }

  onEvent(event) {
    const dataParts = event.split(',')
    const commandId = dataParts.shift()
    if (dataParts[0] === 'CB') {
      delete this.cbs[commandId]
      return
    }
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
      if (this.cbs[commandId].autoCleanup) {
        delete this.cbs[commandId]
      }
    }
  }

  emitCommand(commandName, args = [], cb = null, skipHeader = false) {
    // generate command id
    const commandId = Math.floor(Math.random() * 65535) // uint16_t max
    // retry if command id is already taken
    if (this.cbs[commandId]) return this.emitCommand(commandName, args, cb)
    // create command string
    const argsStr = args.length > 0 ? ',' + args.join(',') : ''
    const command = `${commandId},${commandName}${argsStr}`
    // register callback
    if (cb !== null) {
      this.cbs[commandId] = cb
      if (skipHeader === true || commandName === 'state') {
        this.cbs[commandId].autoCleanup = true
      }
    }
    // get header
    if (!this.headers[commandName] && !skipHeader) {
      const headerCommandId = this.emitCommand(`${commandName}h`, [], header => {
        this.cbs[commandId].header = header
        this.stream.emitCommand(command)
      }, true)
      return commandId
    }
    this.stream.emitCommand(command)
    return commandId
  }
}

export default DwalerClient
