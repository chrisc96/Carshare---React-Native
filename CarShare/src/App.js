import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import Router from './components/Router/router';
import styles from './app-styles'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/background.png')} style={styles.bgImage}>
          <Router />
        </ImageBackground>
      </View>
    );
  }
}