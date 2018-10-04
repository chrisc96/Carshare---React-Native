import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styles from './my-listings-styles';
import Listing from '../../components/Listing/listing';
import * as firestoreListings from '../../data/firestore-listings';

export default class MyListings extends Component {
  constructor() {
    super();

    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    firestoreListings.getUserListings(this.props.screenProps.user.uid, (listings) => {
      this.setState({ listings: listings })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listingsContainer}>
          <FlatList data={this.state.listings} renderItem={({ item }) => <Listing {...item} showRequestToShare={false}/>} />
        </View>
      </View>
    );
  }
}