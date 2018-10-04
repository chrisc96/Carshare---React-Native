import React, { Component } from 'react';

import MyListingsComponent from '../components/MyListings/my-listings';

export default class MyListings extends Component {
  render() {
    return (
      <MyListingsComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}