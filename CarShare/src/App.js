import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import Router from './components/Router/router';
import styles from './app-styles'
import firebase from 'react-native-firebase';

export default class App extends Component {

  componentDidMount() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
  }

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