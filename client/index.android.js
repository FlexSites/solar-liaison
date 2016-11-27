import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './App/store';
import HomeView from './App/HomeView';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class App extends Component {
  render() {
    return (      
      <ApolloProvider client={client}>
        <HomeView />
      </ApolloProvider>
    )
  }
}

AppRegistry.registerComponent('Project', () => App);
