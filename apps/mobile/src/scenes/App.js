import React, {
  Component,
  Navigator,
  Platform,
  BackAndroid,
  Text
} from 'react-native'
import Dwaler from '../services/dwaler'
import Dashboard from './Dashboard'
import Destination from './Destination'
import Trace from './Trace'

// testing on android only
import PoorMansNavigator from '../components/PoorMansNavigator'

const sceneMap = {
  dashboard: Dashboard,
  destination: Destination,
  trace: Trace
}

class App extends Component {
  constructor(props) {
    super(props)
    this.currentRoute = 'dashboard'
    this.renderScene = this.renderScene.bind(this)
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.refs.NAVIGATOR.getCurrentRoutes().length === 1) {
        return false
      }
      this.refs.NAVIGATOR.pop()
      return true
    })
    this.state = {
      connection: null
    }
  }

  componentDidMount() {
    Dwaler.connect()
      .then(connection => {
        this.setState({ connection })
      })
  }

  navigateTo(route, params) {
    if (route !== this.currentRoute) {
      this.refs.NAVIGATOR.push({
        name: route,
        component: sceneMap[route],
        params: params
      })
      this.currentRoute = route
    }
  }

  configureScene() {
    return Navigator.SceneConfigs.FadeAndroid
  }

  renderScene(route) {
    return React.createElement(sceneMap[route.name], {
      key: route.name,
      connection: this.state.connection,
      navigateTo: this.navigateTo.bind(this),
      ...route.params
    })
  }

  render() {
    if (!this.state.connection) {
      return <Text>Connecting to dwaler....</Text>
    }
    if (Platform.OS === 'ios') {
      return (
        <Navigator
          ref="NAVIGATOR"
          initialRoute={{ name: this.currentRoute }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
        />
      )
    }
    return (
      <PoorMansNavigator
        ref="NAVIGATOR"
        initialRoute={{ name: this.currentRoute }}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    )
  }
}

export default App
