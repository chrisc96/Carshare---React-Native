import React, { Component } from 'react';
import styles from './rides-im-taking-styles'
import { RidesTakingHeaderTitle } from '../../config/constants';
import Header from '../../components/Header/header';

export default class RidesImTaking extends Component {

  render() {
    return (
      <Header
        headerTitle={RidesTakingHeaderTitle}>
      </Header>
    );
  }
}
