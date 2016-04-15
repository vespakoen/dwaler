import React, {
  Component
} from 'react'

import Dwaler from './services/dwaler'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'unknown',
      trips: [],
      traces: [],
      rapport: 'unknown'
    }
  }

  componentDidMount() {
    Dwaler.connect()
      .then(dwaler => {
        dwaler.getPosition().then(position => this.setState({ position }))
        dwaler.getState().then(state => this.setState({ state }))
        dwaler.getRapport().then(rapport => this.setState({ rapport }))
        dwaler.getTrips(trip => {
          this.state.trips.push(trip);
          dwaler.getTrace(trip.name, 1, trace => {
            this.state.traces.push([trip.name, trace]);
            this.setState({ traces: this.state.traces })
          })
          this.setState({ trips: this.state.trips })
        })
      })
  }

  render() {
    return (
      <div>
        State: <pre>{ JSON.stringify(this.state.state, undefined, 2) }</pre><br />
        Trips: <pre>{ JSON.stringify(this.state.trips, undefined, 2) }</pre><br />
        Traces: <pre>{ JSON.stringify(this.state.traces, undefined, 2) }</pre><br />
        Rapport: <pre>{ JSON.stringify(this.state.rapport, undefined, 2) }</pre>
      </div>
    )
  }
}

App.propTypes = {
}

export default App
