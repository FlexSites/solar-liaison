import React, { Component, } from 'react'
import { View, Text } from 'react-native'

class SystemStatus extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>System Operational</Text>
      </View>
    )
  }
}

export default SystemStatus