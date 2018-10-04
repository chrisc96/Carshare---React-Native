import React, { Component } from 'react';

import { PostARideHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import PostARideComponent from '../components/PostARide/post-a-ride';

export default class PostARide extends Component {
  static navigationOptions = {
    headerTitle: PostARideHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight
    }
  }

  render() {
    return (
      <PostARideComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}