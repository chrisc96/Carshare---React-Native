import React, { Component } from 'react';

import { EditProfileHeaderTitle } from '../config/constants';
import { headerTextColour, normalFontWeight } from '../config/global-styles';
import EditProfileComponent from '../components/EditProfile/edit-profile';

export default class EditProfile extends Component {
  static navigationOptions = {
    headerTitle: EditProfileHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight
    }
  }

  render() {
    return (
      <EditProfileComponent navigation={this.props.navigation} screenProps={this.props.screenProps} />
    )
  }
}