import React, {
  Component,
  StyleSheet,
  ScrollView,
  View
} from 'react-native'
import DestinationButton from './DestinationButton'

const styles = StyleSheet.create({
})

class DestinationSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destinations: []
    }
  }

  componentDidMount() {
    const dwaler = this.props.connection
    dwaler.getDestinations()
      .then(destinations => {
        console.log('DESTINATIONS', destinations)
        this.setState({ destinations })
      })
  }

  render() {
    return (
      <ScrollView>
        { this.state.destinations.map(destination =>
          <DestinationButton
            key={destination.name}
            destination={destination}
            navigateTo={this.props.navigateTo}
          />
        ) }
      </ScrollView>
    )
  }
}

DestinationSelector.propTypes = {
  connection: React.PropTypes.object,
  navigateTo: React.PropTypes.func
}

export default DestinationSelector
