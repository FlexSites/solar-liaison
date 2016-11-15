import React, { Component, } from 'react'
import { View, StyleSheet, } from 'react-native'
import SystemStatus from './components/SystemStatus'
import InstallProgress from './components/InstallProgress'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
})
                                 
class HomeView extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <SystemStatus />
        <InstallProgress />
      </View>
    )
  }
}



export default HomeView