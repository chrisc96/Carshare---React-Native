import React, { Component } from 'react';

import { MyListingsHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import MyListingsComponent from '../components/MyListings/my-listings';

export default class MyListings extends Component {
  static navigationOptions = {
    headerTitle: MyListingsHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  render() {
    return (
      <MyListingsComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}