import React, { Component } from 'react';

import { headerTextColour, normalFontWeight } from '../config/global-styles';
import ReviewShareRequestComponent from '../components/ReviewShareRequest/review-share-request';

export default class ReviewShareRequest extends Component {

  render() {
    return (
      <ReviewShareRequestComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}