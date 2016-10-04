import debug from './debug'
const log = debug('MockStream')

class MockStream {
  static connect(url) {
    return Promise.resolve(new MockStream())
  }

  constructor() {
    this.lat = 50.5
    this.lng = 5.21
  }

  onEvent(cb) {
    this.cb = cb
  }

  getPosition() {
    var ts = (new Date()).toISOString()
    this.lat = this.lat + Math.random() / 10
    this.lng = this.lng + Math.random() / 10
    return [ts, this.lat, this.lng, 50.5].join(',')
  }

  emitCommand(command) {
    log.debug('emitCommand', command)
    var [commandId, commandName] = command.split(',')
    if (commandName == 'live') {
      this.liveCommandId = commandId
      this.liveInteval = setInterval(() => {
        this.emit(this.liveCommandId, this.getPosition())
      }, 1000)
    }
    if (commandName == 'liveh' || commandName == 'triph') {
      this.emit(commandId, 'ts,lat,lng,alt')
    }
    if (commandName == 'state') {
      this.emit(commandId, 'BERLIN,1,50.5,5.43,50.5,5.44,1,1,1,92.45,35.00')
    }
    if (commandName == 'stateh') {
      this.emit(commandId, 'dest,trip,slat,slng,dlat,dlng,sats,fix,fixq,top,dist')
    }
    if (commandName == 'liveoff') {
      clearInterval(this.liveInterval)
    }
    if (commandName == 'chdest') {
      // noop
    }
    if (commandName == 'dests') {
      this.emit(commandId, 'BERLIN,50.5,5.44')
      this.emit(commandId, 'ASIA,51.5,5.44')
      this.emit(commandId, 'PORTO,52.5,-5.44')
    }
    if (commandName == 'destsh') {
      this.emit(commandId, 'name,lat,lng')
    }
    if (commandName == 'trips') {
      this.emit(commandId, '20160806221400')
      this.emit(commandId, '20160806221401')
      this.emit(commandId, '20160806221402')
    }
    if (commandName == 'tripsh') {
      this.emit(commandId, 'ts')
    }
    if (commandName == 'trip') {
      this.emit(commandId, '20160806221400,50.5,5.44,105.3')
      this.emit(commandId, '20160806221401,50.55,5.445,105.3')
      this.emit(commandId, '20160806221402,50.6,5.45,103.3')
    }
  }

  emit(commandId, command) {
    this.cb(commandId + ',' + command)
  }
}

export default MockStream