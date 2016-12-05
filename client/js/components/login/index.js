
import React, { Component } from 'react';
import { Image, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import Video from 'react-native-video';

import { setUser } from '../../actions/user';
import styles from './styles';

const {
  replaceAt,
} = actions;

const videoSrc = require('../../../images/video.mp4');

const background = require('../../../images/logo_white.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Content>
            <View style={styles.header}>
              <Video
                repeat
                resizeMode="cover"
                source={videoSrc}
                style={styles.backgroundVideo}
              />
              <Image source={background} style={styles.shadow} />
              <Text style={{ color: '#FBFAFA', marginTop: 20 }}>Sales Liaison App</Text>
            </View>
            <View style={styles.bg}>
              <InputGroup style={styles.input}>
                <Icon name="ios-person" />
                <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })} />
              </InputGroup>
              <InputGroup style={styles.input}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="PASSWORD"
                  secureTextEntry
                />
              </InputGroup>
              <Button block style={styles.btn} textStyle={styles.btnText} onPress={() => this.replaceRoute('home')}>
                Login
              </Button>
            </View>
          </Content>
        </View>
      </Container>
    );
  }

  setUser(name) {
    this.props.setUser(name);
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
