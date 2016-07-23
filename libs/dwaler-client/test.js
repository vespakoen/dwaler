const Dwaler = require('./node')
Dwaler.connect('/dev/cu.wchusbserial1410')
  .then(function (dwaler) {
    dwaler.getState(function (state) {
      console.log('state', state)
    })
    const stopLive = dwaler.startLive(live => {
      console.log('live', live)
    })
    const stopRegular = dwaler.startRegular(regular => {
      console.log('regular', regular)
    })
    setTimeout(() => {
      stopLive()
      stopRegular()
    }, 5000)
  })
