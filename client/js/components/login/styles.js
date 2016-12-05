
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
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight / 2.75,
  },
  bg: {
    paddingTop: 100,
  },
  input: {
    marginBottom: 20,
    width: deviceWidth,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#33c0ae',
    width: deviceWidth,
    height: 60,
    borderRadius: 0,
  },
  btnText: {
    fontWeight: 'bold',
  },
  backgroundVideo: {
    position: 'absolute',
    height: 230 * 1.2,
    width: 500 * 1.2,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
