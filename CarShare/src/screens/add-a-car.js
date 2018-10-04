import React, { Component } from 'react';

import { AddACarHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import AddACarComponent from '../components/AddACar/add-a-car';

export default class AddACar extends Component {
  static navigationOptions = {
    headerTitle: AddACarHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <AddACarComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}