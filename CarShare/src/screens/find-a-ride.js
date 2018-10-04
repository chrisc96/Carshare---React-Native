import React, { Component } from 'react';

import { FindARideHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import FindARideComponent from '../components/FindARide/find-a-ride';

export default class FindARide extends Component {
  static navigationOptions = {
    headerTitle: FindARideHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <FindARideComponent navigation={this.props.navigation} screenProps={this.props.screenProps}/>
    )
  }
}