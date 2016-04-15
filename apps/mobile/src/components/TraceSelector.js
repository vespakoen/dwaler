import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import TraceButton from './TraceButton'
import linestring from 'turf-linestring'
import extent from 'turf-extent'
import lineDistance from 'turf-line-distance'
import BBPromise from 'bluebird'

const styles = StyleSheet.create({
})

class TraceSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      traces: []
    }
  }

  componentDidMount() {
    const destination = this.props.destination
    const dwaler = this.props.connection
    const traceNums = Array.from(Array(destination.traceCount + 1).keys())
    traceNums.shift()
    return BBPromise.map(traceNums, traceNum => {
      return dwaler.getTrace(destination.name, traceNum)
        .then(coords => {
          const latLngCoords = []
          const lngLatCoords = []
          const startTime = coords[0].time
          const endTime = coords[coords.length - 1].time
          let topSpeed = {}
          let topTemp = {}
          let topRpm = {}
          let topAltitude = {}
          let totalSpeed = 0
          let totalTemp = 0
          let totalRpm = 0
          coords.forEach(coord => {
            latLngCoords.push([coord.latitude, coord.longitude])
            lngLatCoords.push([coord.longitude, coord.latitude])
            totalSpeed += coord.speed
            totalRpm += coord.rpm
            totalTemp += coord.temp
            if (!topSpeed.speed || coord.speed > topSpeed.speed) topSpeed = coord
            if (!topTemp.temp || coord.temp > topTemp.temp) topTemp = coord
            if (!topRpm.rpm || coord.rpm > topRpm.rpm) topRpm = coord
            if (!topAltitude.altitude || coord.altitude > topAltitude.altitude) topAltitude = coord
          })
          const lineString = linestring(lngLatCoords)
          const bbox = extent(lineString)
          const distance = lineDistance(lineString, 'kilometers')
          const annotations = [
            {
              type: 'polyline',
              coordinates: latLngCoords,
              strokeColor: '#1f3a5d',
              strokeWidth: 4,
              alpha: 0.7,
              id: `${destination.name}-${traceNum}`
            },
            {
              type: 'point',
              coordinates: latLngCoords[0],
              annotationImage: {
                url: 'http://s9.postimg.org/jeubfcmcf/start.png',
                width: 53,
                height: 103
              }
            },
            {
              type: 'point',
              coordinates: [topAltitude.latitude, topAltitude.longitude],
              annotationImage: {
                url: 'http://s9.postimg.org/9qgvc7rj3/peak.png',
                width: 53,
                height: 103
              }
            },
            {
              type: 'point',
              coordinates: [topRpm.latitude, topRpm.longitude],
              annotationImage: {
                url: 'http://s9.postimg.org/9it8fpgkf/rpm.png',
                width: 53,
                height: 103
              }
            },
            {
              type: 'point',
              coordinates: [topSpeed.latitude, topSpeed.longitude],
              annotationImage: {
                url: 'http://s9.postimg.org/44ug85qu7/speed.png',
                width: 53,
                height: 103
              }
            },
            {
              type: 'point',
              coordinates: [topTemp.latitude, topTemp.longitude],
              annotationImage: {
                url: 'http://s9.postimg.org/5stlmt4pr/temp.png',
                width: 53,
                height: 103
              }
            },
            {
              type: 'point',
              coordinates: latLngCoords[latLngCoords.length - 1],
              annotationImage: {
                url: 'http://s9.postimg.org/5vdh9n8db/end.png',
                width: 53,
                height: 103
              }
            }
          ]
          return {
            distance,
            annotations,
            bbox,
            startTime,
            endTime,
            topSpeed,
            topTemp,
            topRpm,
            topAltitude,
            coords,
            avgSpeed: totalSpeed / coords.length,
            avgRpm: totalRpm / coords.length,
            avgTemp: totalTemp / coords.length
          }
        })
    })
    .then(traces => this.setState({ traces }))
  }

  render() {
    const destination = this.props.destination
    return (
      <ScrollView>
        { this.state.traces.map(trace =>
          <TraceButton
            key={destination.name}
            destination={destination}
            trace={trace}
            navigateTo={this.props.navigateTo}
          />
        ) }
      </ScrollView>
    )
  }
}

TraceSelector.propTypes = {
  navigateTo: React.PropTypes.func,
  connection: React.PropTypes.object,
  destination: React.PropTypes.object
}

export default TraceSelector
