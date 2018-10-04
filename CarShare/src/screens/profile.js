import React, { Component } from 'react';

import { ProfileHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import ProfileComponent from '../components/Profile/profile';

export default class Profile extends Component {
  static navigationOptions = {
    headerTitle: ProfileHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight
    }
  }

  render() {
    return (
      <ProfileComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}