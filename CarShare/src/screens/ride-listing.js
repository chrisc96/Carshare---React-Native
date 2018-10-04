import React, { Component } from 'react';

import { RideListingHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import RideListingComponent from '../components/RideListing/ride-listing';

export default class RideListing extends Component {
  static navigationOptions = {
    headerTitle: RideListingHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <RideListingComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}