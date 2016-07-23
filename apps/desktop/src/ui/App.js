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
      destinations: null,
      trips: null
    }
  }

  componentDidMount() {
    Dwaler.connect('/dev/cu.wchusbserial1410')
      .then(dwaler => {
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
      <div>
        {JSON.stringify(this.state)}
      </div>
    )
  }
}

App.propTypes = {
}

export default App
