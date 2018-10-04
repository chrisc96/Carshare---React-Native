import React, { Component } from 'react';

import { SignUpHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import SignUpComponent from '../components/SignUp/sign-up';

export default class SignUp extends Component {
  static navigationOptions = {
    headerTitle: SignUpHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <SignUpComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}