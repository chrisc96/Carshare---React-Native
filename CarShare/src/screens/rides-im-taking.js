import React, { Component } from 'react';

import { RidesTakingHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import RidesImTakingComponent from '../components/RidesImTaking/rides-im-taking';

export default class RidesImTaking extends Component {
  static navigationOptions = {
    headerTitle: RidesTakingHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <RidesImTakingComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}