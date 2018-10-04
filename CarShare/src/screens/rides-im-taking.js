import React, { Component } from 'react';

import RidesImTakingComponent from '../components/RidesImTaking/rides-im-taking';

export default class RidesImTaking extends Component {
  render() {
    return (
      <RidesImTakingComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}