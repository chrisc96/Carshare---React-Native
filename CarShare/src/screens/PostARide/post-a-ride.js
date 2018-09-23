import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './post-a-ride-styles'
import { PostARideHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'

export default class PostARide extends Component {

  static navigationOptions = {
    title: PostARideHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <View>
        <Text>Post a ride</Text>
      </View>
    );
  }
}