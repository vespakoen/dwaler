import React, {
  Component
} from 'react'

const Dwaler = electronRequire('dwaler-client/node')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: null,
      live: null,
      regular: null,
      destinations: [],
      trips: {}
    }
  }

  componentDidMount() {
    Dwaler.connect('/dev/cu.wchusbserial1410')
      .then(dwaler => {
        dwaler.getState(state => this.setState({ state }))
        dwaler.getDestinations(destination => {
          const { destinations } = this.state
          destinations.push(destination)
          this.setState({ destinations })
        })
        const tripName = 'BERLIN'
        const tripNum = '1'
        dwaler.getTripRows(tripName, tripNum, tripRow => {
          const { trips } = this.state
          if (!trips[tripName]) trips[tripName] = {}
          if (!trips[tripName][tripNum]) trips[tripName][tripNum] = []
          trips[tripName][tripNum].push(tripRow)
          this.setState({ trips })
        })
        dwaler.getState(state => this.setState({ state }))
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
