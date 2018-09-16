import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import Home from './screens/Home'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/background.png')} style={styles.bgImage}>
          <Home />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%'
  }
});
