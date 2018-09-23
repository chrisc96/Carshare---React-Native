import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, FlatList } from 'react-native';

import styles from './my-listings-styles'
import { MyListingsHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'

import Listing from '../../components/Listing/listing';

export default class MyListings extends Component {

  static navigationOptions = {
    headerTitle: MyListingsHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings').where('userDocumentID', '==', 'ihurClUu4MTSGMeqIjUUiQ9klLe2');

    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    this.firestoreListings.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (snapshot) => {
    const listings = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, whoWantsToCome, whosComing } = firestoreDocument.data();

      listings.push({
        key: firestoreDocument.id,
        firestoreDocument,
        departureDate,
        departureTime,
        destination,
        meetingPoint,
        seatsAvailable,
        storageSpace
      });
    });

    this.setState({
      listings,
    });
  }


  render() {
    return (
      <View style={styles.listings}>
        <FlatList data={this.state.listings} renderItem={({ item }) => <Listing {...item} />} />
      </View>
    );
  }
}