import React, {
  Component
} from 'react'

const Dwaler = electronRequire('dwaler-client/node')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: null,
      regular: null,
      destinations: [],
      tripRows: {},
      trips: {}
    }
  }

  componentDidMount() {
    Dwaler.connect('/dev/cu.wchusbserial1410')
      .then(dwaler => {
        dwaler.getDestinations(destination => {
          const { destinations } = this.state
          destinations.push(destination)
          this.setState({ destinations })
          dwaler.getTrips(destination.name, trip => {
            const tripRows = this.state.tripRows
            if (!tripRows[destination.name]) tripRows[destination.name] = []
            tripRows[destination.name].push(trip)
            this.setState({ tripRows })
          })
        })
        const destinationName = 'BERLIN'

        const tripNum = '1'
        dwaler.getTripRows(destinationName, tripNum, tripRow => {
          const { trips } = this.state
          console.log('DEST', destinationName)
          console.log('TRIPNUM', tripNum)
          if (!trips[destinationName]) trips[destinationName] = {}
          if (!trips[destinationName][tripNum]) trips[destinationName][tripNum] = []
          trips[destinationName][tripNum].push(tripRow)
          this.setState({ trips })
        })
        this.stopLive = dwaler.startLive(live => this.setState({ live }))
        this.stopRegular = dwaler.startRegular(regular => this.setState({ regular }))
      })
  }

  componentWillUnmount() {
    if (this.stopLive) this.stopLive()
    if (this.stopRegular) this.stopRegular()
  }

  render() {
    return (
      <code>
        <pre>
          {JSON.stringify(this.state, undefined, 2)}
        </pre>
      </code>
    )
  }
}

App.propTypes = {
}

export default App
