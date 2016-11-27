import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

const InstallProgress = () => {
  return (
    <View>
      <Text style={{ textAlign: 'left', fontSize: 32 }}>Install Progress</Text>
      <Icon name='ios-sunny' />
      <Icon name='md-sunny' />
      <Icon name='ios-partly-sunny' />
      <Icon name='md-partly-sunny' />
    </View>
  )
}

InstallProgress.propTypes = {}
InstallProgress.defaultProps = {}

export default InstallProgress