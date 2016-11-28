import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text as ReactText, Dimensions, View } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Tabs } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import Pie from '../Pie';
import myTheme from '../../themes/base-theme';

const { width } = Dimensions.get('window');


const {
  popRoute,
} = actions;

const sample = {
  production: [{
    name: 'Today',
    kW: 5,
  }, {
    name: 'Average',
    kW: 2,
  }],
  consumption: [{
    name: 'Today',
    kW: 7,
  }, {
    name: 'Average',
    kW: 1,
  }],
  options: {
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    color: '#FD8224',
    r: width / 4,
    R: width / 3,
    legendPosition: 'topLeft',
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3,
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: true,
      color: '#ECF0F1',
    },
  },
};

const sampleWeek = {
  production: [{
    name: 'Today',
    kW: 38,
  }, {
    name: 'Average',
    kW: 4,
  }],
  consumption: [{
    name: 'Today',
    kW: 48,
  }, {
    name: 'Average',
    kW: 3,
  }],
  options: {
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    color: '#FD8224',
    r: width / 4,
    R: width / 3,
    legendPosition: 'topLeft',
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3,
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: true,
      color: '#ECF0F1',
    },
  },
};

class ProductionPage extends Component {

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
            <Icon name="ios-arrow-back" style={styles.menu} />
          </Button>

          <Title>{(name) ? this.props.name : 'Production'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" style={styles.menu} />
          </Button>
        </Header>

        <Content style={{ padding: 10 }} theme={myTheme} >
          <Tabs>
            <Content tabLabel="Today" style={{ paddingTop: 10 }}>
              <Pie
                percentage={sample.percentage}
                production={sample.production}
                consumption={sample.consumption}
                options={sample.options}
                accessorKey="kW"
                width={300}
                height={300}
                style={{ alignSelf: 'center' }}
              />
              <ReactText style={{ textAlign: 'center', marginTop: 15, fontWeight: '500', fontSize: 18 }}>Production</ReactText>
            </Content>
            <Content tabLabel="This Week" style={{ paddingTop: 10 }}>
              <Pie
                percentage={sampleWeek.percentage}
                production={sampleWeek.production}
                consumption={sampleWeek.consumption}
                options={sampleWeek.options}
                accessorKey="kW"
                width={300}
                height={300}
                style={{ alignSelf: 'center' }}
              />
              <ReactText style={{ textAlign: 'center', marginTop: 15, fontWeight: '500', fontSize: 18 }}>Production</ReactText>
            </Content>
          </Tabs>
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


export default connect(mapStateToProps, bindAction)(ProductionPage);
