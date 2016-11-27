
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    marginTop: 10,
  },
  header: {
    flex: 1,
    height: deviceHeight / 2.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    paddingTop: 100,
  },
  input: {
    marginBottom: 20,
    width: deviceWidth
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#FF8200',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
