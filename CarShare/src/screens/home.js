import React, { Component } from 'react';

import HomeComponent from  '../components/Home/home';

export default class Home extends Component {
  static navigationOptions = {
    header: null // Don't show header
  }

  render() {
    return (
      <HomeComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}