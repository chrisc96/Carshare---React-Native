import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, FlatList, TouchableHighlight } from 'react-native';
import styles from './rides-im-taking-styles';
import Listing from '../../components/Listing/listing';
import { RidesTakingHeaderTitle } from '../../config/constants';
import { headerTextColour, normalFontWeight } from '../../config/global-styles';

export default class RidesImTaking extends Component {

  static navigationOptions = {
    title: RidesTakingHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings');

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
    let listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, userDocumentID, carDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

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
          userDocumentID,
          whoWantsToCome,
          whosComing
        });

        listingsFromDB = listingsFromDB.filter(listing => {
          
          const userPoster = listing.userDocumentID;
          let iDidntPostThisListing = true;
          let comingOnThisListing = false;

          listing.whosComing.forEach(el => {
            if (userPoster === el.uid) {
              iDidntPostThisListing = false
              return
            }

            if (el.uid === firebase.auth().currentUser.uid) {
              comingOnThisListing = true
              return
            }
          })
          return comingOnThisListing && iDidntPostThisListing
        })

        this.setState({
          listings: listingsFromDB
        });

      })
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