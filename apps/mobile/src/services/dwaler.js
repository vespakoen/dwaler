const defaultUrl = 'ws://192.168.1.4:8081'

class Dwaler {
  static connect(url = defaultUrl) {
    return new Promise(resolve => {
      const ws = new WebSocket(url)
      ws.onopen = () => resolve(new Dwaler(ws))
    })
  }

  constructor(ws) {
    this.ws = ws
    this.ws.onmessage = this.onMessage.bind(this)
    this.cbs = {}
    this.doneCbs = {}
  }

  getLocation(cb = null) {
    return this.call('location', [], cb)
  }

  getState(cb = null) {
    return this.call('state', [], cb)
  }

  getDestinations(onTrip = null, cb = null) {
    if (onTrip === null) {
      return this.getDestinationsPromise()
    }
    return this.call('destination', [], onTrip, cb)
  }

  getTrace(destinationName, traceNum, onTrace = null, cb = null) {
    if (onTrace === null) {
      return this.getTracePromise(destinationName, traceNum)
    }
    return this.call('trace', [destinationName, traceNum], onTrace, cb)
  }

  getDestinationsPromise() {
    return new Promise(resolve => {
      const trips = []
      this.getDestinations(trip => {
        trips.push(trip)
      }, () => resolve(trips))
    })
  }

  getTracePromise(destinationName, traceNum) {
    return new Promise(resolve => {
      const coords = []
      this.getTrace(destinationName, traceNum, coord => {
        coords.push(coord)
      }, () => resolve(coords))
    })
  }

  onMessage(e) {
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
          traceNum: Number(parts[15]),
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
          traceCount: Number(parts[6])
        })
      case 'trace':
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
      this.ws.send(command)
      return
    }
    return new Promise(resolve => {
      this.cbs[commandId] = resolve
      this.ws.send(command)
    })
  }
}

export default Dwaler
