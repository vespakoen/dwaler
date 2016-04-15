import React, {
  Component,
  View
} from 'react-native'
import Swiper from 'react-native-swiper'

// for debugging on android only

class PoorMansNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stack: [props.initialRoute],
      route: props.initialRoute
    }
  }

  resetTo(route) {
    this.setState({
      stack: [route],
      route
    })
  }

  push(route) {
    this.state.stack.push(route)
    this.setState({
      stack: this.state.stack,
      route
    })
  }

  renderRoutes() {
    // return this.props.renderScene(route)
    console.log('STACK', this.state.stack)
    return this.state.stack.map(route => {
      // if (route.name === this.state.route.name) {
        return this.props.renderScene(route)
      // }
      // return <View key={route.name} style={{ flex: 1 }} />
    })
  }

  render() {
    return (
      <Swiper style={{ flex: 1 }}>
        { this.renderRoutes() }
      </Swiper>
    )
  }
}

PoorMansNavigator.propTypes = {
  initialRoute: React.PropTypes.object,
  renderScene: React.PropTypes.func
}

export default PoorMansNavigator
