import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import firebase from 'react-native-firebase';
import Listing from '../components/listing';

export default class FindARide extends Component {
  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings');
    console.log(this.firestoreListings)

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

const styles = StyleSheet.create({
  listings: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  }
});
