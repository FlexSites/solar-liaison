
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Thumbnail } from 'native-base';
import { phonecall, email } from 'react-native-communications';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';


const {
  reset,
  pushRoute,
} = actions;

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

  constructor(props) {
    super(props);
    this.state = {
      ptoed: false,
    };
  }

  getStatusSummary() {
    // This will be smater and look at the status from the logged in User
    return (
      <View>
        <ListItem itemDivider>
          <Text style={styles.white}>
            {this.props.name}'s To-Do List
          </Text>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-checkbox-outline" />
          <Text>
             Schedule Site Survey
          </Text>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-square-outline" />
          <Text>
            Make sure you or someone over 18 is home
          </Text>
        </ListItem>
        <ListItem itemDivider>
          <Text style={styles.white}>
            Our To-Do List
          </Text>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-square-outline" />
          <Text>
             Perform Site Survey
          </Text>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-square-outline" />
          <Text>
            Verify that your home is a good fit
          </Text>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-square-outline" />
          <Text>
            Send information to design team
          </Text>
        </ListItem>
      </View>
    );
  }

  getUsageSummary() {
    const status = this.props.lastDaysProduction ? <Text>System <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>Reporting</Text></Text> : <Text>System <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>NOT Reporting</Text></Text>;
    const text = this.props.lastDaysProduction ? `You've produced ${this.props.lastDaysProduction} ${this.props.productionUnit} today` : 'Please Contact Customer Serivce';
    return (
      <View>
        <ListItem itemDivider>
          <Text style={styles.white}>
            Production Summary
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            {status}{'\n'}{'\n'}{text}
          </Text>
        </ListItem>
      </View>
    );
  }

  openPhone() {
    const number = this.state.ptoed ? '1-877-404-4129' : this.props.repNumber;
    phonecall(number, true);
  }

  openEmail() {
    const contactEmail = this.state.ptoed ? 'help@vivintsolar.com' : this.props.repEmail;
    email([contactEmail], null, null, null, null);
  }

  switchView() {
    this.setState({
      ptoed: !this.state.ptoed,
    });
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const name = this.state.ptoed ? 'Customer Service' : this.props.repName;
    const number = this.state.ptoed ? '1-877-404-4129' : this.props.repNumber;
    const imageURI = this.state.ptoed ? 'https://scontent.cdninstagram.com/t51.2885-19/s320x320/13721137_582908658580658_976291962_a.jpg' : 'https://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg'; //`https://46nsgon4l7.execute-api.us-west-2.amazonaws.com/prod/tms/workday-photo/${this.props.repId}`;
    const buttons = (
      <View>
        <Button transparent style={{ marginBottom: 5, width: 80, display: 'inline-block' }} onPress={() => this.openPhone()}>
          <Icon name="md-call" style={{ fontSize: 32 }} />
          <Text style={styles.white}>Call</Text>
        </Button>
        <Button transparent style={{ marginBottom: 5, width: 80, display: 'inline-block' }} onPress={() => this.openEmail()}>
          <Icon name="md-mail" style={{ fontSize: 32 }} />
          <Text style={styles.white}>    Email</Text>
        </Button>
      </View>
    );

    const summaryList = this.state.ptoed ? this.getUsageSummary() : this.getStatusSummary();

    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>

          <Title>Summary</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" style={styles.white} />
          </Button>
        </Header>
        <Content>
          <List>
            {summaryList}
            <ListItem>
              <Thumbnail
                size={80}
                source={{ uri: imageURI }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }}>
                Contact
              </Text>
              <Text >
                {name}{'\n'}<Text style={{ color: '#33c0ae', fontWeight: 'bold' }}>{number}{'\n'}</Text>
              </Text>
              {buttons}
            </ListItem>
          </List>
          <Button transparent onPress={() => this.switchView()} >
            <Text>
              {/* Temporary hidden button to swap between views */}
            </Text>
          </Button>
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
