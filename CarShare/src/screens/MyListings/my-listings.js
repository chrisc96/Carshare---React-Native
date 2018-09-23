import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import {View, Text, FlatList} from 'react-native';

import styles from './my-listings-styles'

import Listing from '../../components/Listing/listing';

export default class MyListings extends Component {
  constructor() {
    super();
    console.log(firebase.auth().currentUser.uid)
    this.firestoreListings = firebase.firestore().collection('listings').where('userDocumentID', '==', firebase.auth().currentUser.uid);

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
        <View style = {styles.listings}>
          <FlatList data={this.state.listings} renderItem={({ item }) => <Listing {...item} />}/>
        </View>
      );
  }
}