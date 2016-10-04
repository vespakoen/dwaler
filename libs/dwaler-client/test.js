var Dwaler = require('./lib/index').default
var MockStream = require('./lib/mockStream').default

Dwaler.connect = function () {
  return MockStream.connect()
    .then(function (stream) {
      return new Dwaler(stream)
    })
}

Dwaler.connect()
  .then(function (dwaler) {
    console.log('getting state')
    dwaler.getState(function (state) {
      console.log('state', state)
      console.log('starting live')
      const stopLive = dwaler.live(function (live) {
        console.log('live', live)
      })
      setTimeout(function () {
        stopLive()
      }, 1000)
    })
  })
