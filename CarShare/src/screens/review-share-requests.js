import React, { Component } from 'react';

import { ReviewShareRequestsHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import ReviewShareRequestsComponent from '../components/ReviewShareRequests/review-share-requests';

export default class ReviewShareRequests extends Component {
  static navigationOptions = {
    headerTitle: ReviewShareRequestsHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight
    }
  }

  render() {
    return (
      <ReviewShareRequestsComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}