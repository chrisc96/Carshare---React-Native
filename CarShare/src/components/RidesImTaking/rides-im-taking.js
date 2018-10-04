import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, FlatList, TouchableHighlight } from 'react-native';

import styles from './rides-im-taking-styles';
import Listing from '../../components/Listing/listing';
import * as firestoreListings from '../../data/firestore-listings';

export default class RidesImTaking extends Component {
  constructor() {
    super();

    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    firestoreListings.getRidesTaking(this.props.screenProps.user.uid, (listings) => {
      this.setState({ listings: listings })
    })
  }

  goToListing(key) {
    this.props.navigation.navigate('RideListing', { key: key, showRequestToShare: false });
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