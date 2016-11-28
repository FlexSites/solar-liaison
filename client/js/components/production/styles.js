import { Platform } from 'react-native';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  menu: {
    color: (Platform.OS === 'ios') ? '#FD8224' : '#fff',
  },
});
