class WebsocketStream {
  static connect(url) {
    return new Promise(resolve => {
      const ws = new WebSocket(url)
      ws.onopen = () => resolve(new WebsocketStream(ws))
    })
  }

  constructor(ws) {
    this.ws = ws
  }

  onEvent(cb) {
    this.ws.onmessage = cb
  }

  emitCommand(command) {
    this.ws.send(command)
  }
}

export default WebsocketStream