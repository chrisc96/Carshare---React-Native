import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';

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

  goToListing(key) {
    this.props.navigation.navigate('RideListing', { key: key, showRequestToShare: false});
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
          <FlatList data={this.state.listings} renderItem={({ item }) => {
            return (
              <TouchableHighlight onPress={() => this.goToListing(item.key)}>
                <Listing {...item} showRequestToShare={false} />
              </TouchableHighlight>
            )
          }} />
        </View>
      </View>
    );
  }
}