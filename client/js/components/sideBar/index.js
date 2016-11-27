
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import { Icon, InputGroup, Input } from 'native-base';
import { closeDrawer } from '../../actions/drawer';

import styles from './style';

const {
  reset,
} = actions;

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    closeDrawer: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content theme={myTheme} style={styles.sidebar} >
        <List>
          <ListItem button onPress={() => this.navigateTo('home')} >
            <Text style={{color: '#FFF'}}>Home</Text>
          </ListItem>
          <ListItem button onPress={() => this.navigateTo('production')} >
            <Text>System Production</Text>
          </ListItem>
          <ListItem button onPress={() => this.navigateTo('blankPage')} >
            <Text style={{color: '#FFF'}}>Blank Page</Text>
          </ListItem>
          <ListItem button onPress={() => this.props.reset(this.props.navigation.key)}>
            <Text style={{alignSelf: 'center', marginRight: 15, color: '#FFF'}}>Logout</Text>
            <Icon name="ios-log-out" style={{color: '#FFF', fontSize: 20}} />
          </ListItem>
        </List>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)) && dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
