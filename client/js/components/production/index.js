
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text as ReactText}  from 'react-native'
import Svg,{ G, Path, Text} from 'react-native-svg'
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';
// import { Pie } from 'react-native-pathjs-charts'

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import Pie from '../Pie'

const {
  popRoute,
} = actions;

const sample = {
    production: [{
        "name": "Today",
        "population": 95
    }, {
        "name": "Average",
        "population": 22,
        "color": "#FFFFFF"
    }],
    consumption: [{
        "name": "Today",
        "population": 50
    }, {
        "name": "Average",
        "population": 22,
        "color": "#FFFFFF"
    }],
    options: {
        margin: {
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        },
        color: '#FD8224',
        r: 100,
        R: 135,
        legendPosition: 'topLeft',
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition: 3
        },
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            color: '#ECF0F1'
        }
    }
}

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Blank Page'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <Pie
            percentage={sample.percentage}
            production={sample.production}
            consumption={sample.consumption}
            options={sample.options}
            accessorKey="population"
          />
          <ReactText style={{ textAlign: 'center', fontSize: 20 }}>Production</ReactText>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);
