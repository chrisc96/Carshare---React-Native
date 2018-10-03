import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import styles from './my-listings-styles';
import Listing from '../../components/Listing/listing';
import { MyListingsHeaderTitle } from '../../config/constants';
import Header from '../../components/Header/header';

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

  goToListing(key) {
    this.props.navigation.navigate('RideListing', { key: key, showRequestToShare: false });
  }

  onCollectionUpdate = (snapshot) => {
    const listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();

        let listingID = firestoreDocument._ref._documentPath._parts[1]

        listingsFromDB.push({
          key: listingID,
          listingID,
          departureDate,
          departureTime,
          destination,
          meetingPoint,
          seatsAvailable,
          storageSpace,
          make,
          model,
          year,
          whoWantsToCome,
          whosComing
        });

        this.setState({
          listings: listingsFromDB
        });
      })
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Header
          headerTitle={MyListingsHeaderTitle}>
        </Header>

        <View style={styles.listingsContainer}>
          <FlatList data={this.state.listings} renderItem={({ item }) => {
            return (
              <TouchableHighlight onPress={() => this.goToListing(item.key)}></TouchableHighlight>
            )
          }} />
        </View>

      </View>
    );
  }
}