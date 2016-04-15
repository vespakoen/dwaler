const defaultUrl = 'ws://192.168.178.83:8081'

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
    this.cbs = {};
  }

  getPosition(cb = null) {
    return this.call('position', [], cb)
  }

  getState(cb = null) {
    return this.call('state', [], cb)
  }

  getTrips(cb) {
    return this.call('trips', [], cb)
  }

  getTrace(tripName, traceNum, cb) {
    return this.call('trace', [tripName, traceNum], cb)
  }

  getRapport(cb = null) {
    return this.call('rapport', [], cb)
  }

  onMessage(e) {
    const parts = e.data.split(',')
    const commandId = parts[0]
    const commandName = parts[1]
    console.log(e.data);
    switch (commandName) {
      case 'position':
        return this.cbs[commandId]({
          latitude: Number(parts[2]),
          longitude: Number(parts[3])
        })
      case 'state':
        return this.cbs[commandId]({
          activeScreen: Number(parts[2]),
          tripName: parts[3]
        })
      case 'trip':
        return this.cbs[commandId]({
          name: parts[2],
          location: {
            latitude: Number(parts[3]),
            longitude: Number(parts[4]),
            altitude: Number(parts[5])
          },
          traceNum: Number(parts[6])
        })
      case 'trace':
        return this.cbs[commandId]({
          latitude: Number(parts[2]),
          longitude: Number(parts[3]),
          altitude: Number(parts[4])
        })
      case 'rapport':
        return this.cbs[commandId]({
          activeScreen: Number(parts[2]),
          tripName: parts[3],
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
          topSpeed: Number(parts[10]),
          averageSpeed: Number(parts[11]),
          travelledDistance: Number(parts[12])
        })
      case 'cb':
        return delete this.cbs[commandId]
    }
  }

  call(commandName, args, cb = null) {
    const commandId = Math.floor(Math.random() * 65535); // uint16_t max
    if (cb !== null) {
      this.cbs[commandId] = cb
      this.ws.send(commandId + ',' + commandName + (args.length > 0 ? '$' + args.join(',') : ''))
      return
    }
    return new Promise(resolve => {
      this.cbs[commandId] = resolve
      this.ws.send(commandId + ',' + commandName + (args.length > 0 ? '$' + args.join(',') : ''))
    })
  }
}

export default Dwaler
