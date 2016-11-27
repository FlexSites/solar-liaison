
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, CheckBox, List, ListItem, Thumbnail } from 'native-base';
import { phoneCall, email } from 'react-native-communications';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';


const {
  reset,
  pushRoute,
} = actions;

const squareLogo = require('../../../images/square_logo.jpg');

class Summary extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    repName: React.PropTypes.string,
    repNumber: React.PropTypes.string,
    repId: React.PropTypes.string,
    lastDaysProduction: React.PropTypes.string,
    productionUnit: React.PropTypes.string,
    repEmail: React.PropTypes.string,
    ptoed: React.PropTypes.bool,
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  getStatusSummary() {
    // This will be smater and look at the status from the logged in User
    return (
      <View>
        <ListItem itemDivider>
          <Text>
            {this.props.name}'s To-Do List
          </Text>
        </ListItem>
        <ListItem>
          <CheckBox checked disabled />
          <Text>
             Schedule Site Survey
          </Text>
        </ListItem>
        <ListItem>
          <CheckBox checked={false} disabled />
          <Text>
            Make sure you or someone over 18 is home
          </Text>
        </ListItem>
        <ListItem itemDivider>
          <Text>
            Our To-Do List
          </Text>
        </ListItem>
        <ListItem >
          <Text>
             Perform Site Survey
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            Verify that your home is a good fit
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            Send information to design team
          </Text>
        </ListItem>
      </View>
    );
  }

  getUsageSummary() {
    const text = this.props.lastDaysProduction ? `You've produced ${this.props.lastDaysProduction} ${this.props.productionUnit} today` : 'Contact Customer Serivce, your system isn\'t reporting';
    return (
      <View>
        <ListItem itemDivider>
          <Text>
            Production
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            {text}
          </Text>
        </ListItem>
      </View>
    );
  }

  openPhone() {
    const number = this.props.ptoed ? '1-877-404-4129' : this.props.repNumber;
    phoneCall(number, true);
  }

  openEmail() {
    const contactEmail = this.props.ptoed ? 'customer.service@vivintsolar.com' : this.props.repEmail;
    email([contactEmail], null, null, null, null);
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const name = this.props.ptoed ? 'Customer Service' : this.props.repName;
    const firstName = this.props.ptoed ? 'Customer Service' : this.props.repName.split(' ')[0];
    const number = this.props.ptoed ? '1-877-404-4129' : this.props.repNumber;
    const imageURI = this.props.ptoed ? 'https://scontent.cdninstagram.com/t51.2885-19/s320x320/13721137_582908658580658_976291962_a.jpg' : 'https://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg'; //`https://46nsgon4l7.execute-api.us-west-2.amazonaws.com/prod/tms/workday-photo/${this.props.repId}`;
    const buttons = (
      <View>
        <Button style={{ marginBottom: 5 }} onPress={() => this.openPhone()}>
          <Text style={{ color: '#fff' }}>Call {firstName}</Text>
        </Button>
        <Button style={{ marginBottom: 5 }} onPress={() => this.openEmail()}>
          <Text style={{ color: '#fff' }}>Send {firstName} an email</Text>
        </Button>
      </View>
    );

    const summaryList = this.props.ptoed ? this.getUsageSummary() : this.getStatusSummary();

    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>

          <Title>Summary</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
        <Content>
          <List>
            {summaryList}
            <ListItem itemDivider>
              <Text>
                Contact:
              </Text>
            </ListItem>
            <ListItem>
              <Thumbnail
                size={80}
                source={{ uri: imageURI }}
              />
              <Text>
                {name}{'\n'}{number}{'\n'}
              </Text>
              {buttons}
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name || 'Mark',
  repName: state.user.repName || 'Jeremy Marshall',
  repNumber: state.user.repNumber || '1-888-888-8888',
  repEmail: state.user.repEmail || 'jmarshall@vivintsolar.com',
  repId: state.user.repId || '1153',
  ptoed: false,
  lastDaysProduction: state.user.lastDaysProduction || '74',
  productionUnit: state.user.productionUnit || 'kW',
});

export default connect(mapStateToProps, bindAction)(Summary);
