import React, { Component } from 'react';

import { LoginHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import LoginComponent from '../components/Login/login';

export default class Login extends Component {
  static navigationOptions = {
    headerTitle: LoginHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <LoginComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}