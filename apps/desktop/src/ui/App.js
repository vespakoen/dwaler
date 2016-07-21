import React, {
  Component
} from 'react'

const Dwaler = electronRequire('dwaler-client/node')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      state: null,
      destinations: null,
      trips: null
    }
  }

  componentDidMount() {
    Dwaler.connect('/dev/cu.wchusbserial1410')
      .then(dwaler => {
        dwaler.getLocation().then(location => this.setState({ location }))
        dwaler.getState().then(state => this.setState({ state }))
        dwaler.getDestinations().then(destinations => this.setState({ destinations }))
      })
  }

  render() {
    return <div>Hi =)</div>
    return (
      <div>
        Location: <pre>{ JSON.stringify(this.state.location, undefined, 2) }</pre><br />
        State: <pre>{ JSON.stringify(this.state.state, undefined, 2) }</pre><br />
        Trips: <pre>{ JSON.stringify(this.state.destinations, undefined, 2) }</pre>
      </div>
    )
  }
}

App.propTypes = {
}

export default App
