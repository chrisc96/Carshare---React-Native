import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, FlatList } from 'react-native';

import styles from './my-listings-styles';
import Listing from '../../components/Listing/listing';

export default class MyListings extends Component {

  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings').where('userDocumentID', '==', firebase.auth().currentUser.uid);

    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    this.firestoreListings.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (snapshot) => {
    const listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();

        listingsFromDB.push({
          key: firestoreDocument.id,
          firestoreDocument,
          departureDate,
          departureTime,
          destination,
          meetingPoint,
          seatsAvailable,
          storageSpace,
          make,
          model,
          year
        });

        this.setState({
          listings: listingsFromDB
        });
      })
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