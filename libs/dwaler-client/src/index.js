class DwalerClient {
  constructor(stream) {
    this.stream = stream
    stream.onEvent(this.onEvent.bind(this))
    this.cbs = {}
    this.doneCbs = {}
  }

  getLocation(cb = null) {
    return this.call('location', [], cb)
  }

  getState(cb = null) {
    return this.call('state', [], cb)
  }

  getDestinations(onDestination = null, cb = null) {
    if (onDestination === null) {
      return this.getDestinationsPromise()
    }
    return this.call('destination', [], onDestination, cb)
  }

  getTrip(destinationName, tripNum, onCoord = null, cb = null) {
    if (onCoord === null) {
      return this.getTripPromise(destinationName, tripNum)
    }
    return this.call('trip', [destinationName, tripNum], onCoord, cb)
  }

  getDestinationsPromise() {
    return new Promise(resolve => {
      const destinations = []
      this.getDestinations(destination => {
        destinations.push(destination)
      }, () => resolve(destinations))
    })
  }

  getTripPromise(destinationName, tripNum) {
    return new Promise(resolve => {
      const coords = []
      this.getTrip(destinationName, tripNum, coord => {
        coords.push(coord)
      }, () => resolve(coords))
    })
  }

  onEvent(e) {
    const parts = e.data.split(',')
    const commandId = parts[0]
    const commandName = parts[1]
    console.log(`<- ${e.data}`)
    switch (commandName) {
      case 'location':
        return this.cbs[commandId]({
          latitude: Number(parts[2]),
          longitude: Number(parts[3]),
          altitude: Number(parts[4])
        })
      case 'state':
        return this.cbs[commandId]({
          activeScreen: Number(parts[2]),
          destinationName: parts[3],
          startingLocation: {
            latitude: Number(parts[4]),
            longitude: Number(parts[5]),
            altitude: Number(parts[6])
          },
          destinationLocation: {
            latitude: Number(parts[7]),
            longitude: Number(parts[8]),
            altitude: Number(parts[9])
          },
          currentLocation: {
            latitude: Number(parts[10]),
            longitude: Number(parts[11]),
            altitude: Number(parts[12])
          },
          topSpeed: Number(parts[13]),
          travelledDistance: Number(parts[14]),
          tripNum: Number(parts[15]),
          heading: Number(parts[16]),
          temp: Number(parts[17]),
          rpm: Number(parts[18])
        })
      case 'destination':
        return this.cbs[commandId]({
          name: parts[2],
          location: {
            latitude: Number(parts[3]),
            longitude: Number(parts[4]),
            altitude: Number(parts[5])
          },
          tripCount: Number(parts[6])
        })
      case 'trip':
        return this.cbs[commandId]({
          latitude: Number(parts[2]),
          longitude: Number(parts[3]),
          altitude: Number(parts[4]),
          time: Math.round(new Date().getTime() / 1000),
          speed: 50 + Math.random() * 10,
          temp: 120 + Math.random() * 50,
          rpm: 1200 + Math.random() * 500
        })
      case 'cb':
        if (this.doneCbs[commandId]) {
          this.doneCbs[commandId]()
          delete this.doneCbs[commandId]
        }
        return delete this.cbs[commandId]
    }
  }

  call(commandName, args, cb = null, doneCb = null) {
    const commandId = Math.floor(Math.random() * 65535) // uint16_t max
    const argsStr = args.length > 0 ? '$' + args.join(',') : ''
    const command = `${commandId},${commandName}${argsStr}`
    console.log(`-> ${command}`)
    if (cb !== null) {
      this.cbs[commandId] = cb
      if (doneCb !== null) {
        this.doneCbs[commandId] = doneCb
      }
      this.stream.emitCommand(command)
      return
    }
    return new Promise(resolve => {
      this.cbs[commandId] = resolve
      this.stream.emitCommand(command)
    })
  }
}

export default DwalerClient
