import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './app-styles'

import Router from './components/Navigation/router';
import * as auth from './data/auth';

export default class App extends Component {

  componentDidMount() {
    auth.logOut();

    this.state={
      user: null
    }

    this.checkLoggedIn()
  }

  checkLoggedIn() {
    auth.checkLoggedIn((user) => {
      this.setState({user: user})
    })
}

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/imgs/background.png')} style={styles.bgImage}>
          <Router screenProps={this.state}/>
        </ImageBackground>
      </View>
    );
  }
}