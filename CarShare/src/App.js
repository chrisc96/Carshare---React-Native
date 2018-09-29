import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import Router from './components/Router/router';
import styles from './app-styles'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/imgs/background.png')} style={styles.bgImage}>
          <Router />
        </ImageBackground>
      </View>
    );
  }
}