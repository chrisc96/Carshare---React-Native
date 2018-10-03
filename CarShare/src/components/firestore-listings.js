import React, { Component } from 'react';
import firebase from 'react-native-firebase';


export default class FirestoreListings extends Component {

  constructor() {
    super();

    this.firestoreListings = firebase.firestore().collection('listings');

    this.state = {
        listings: null
    }
  }

  componentDidMount() {
    this.firestoreListings.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (snapshot) => {
    const listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, userDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();

        firebase.firestore().doc('users/' + userDocumentID).onSnapshot((userDocument) => {
          if (!userDocument.data()) return;
          const { firstName, lastName, contactNum } = userDocument.data();

          let listingID = firestoreDocument._ref._documentPath._parts[1]
          
          if (seatsAvailable > 0) {
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
              firstName,
              lastName,
              contactNum,
              whoWantsToCome,
              whosComing
            });

            this.setState({
              listings: listingsFromDB
            }) 
          }
        })
      })
    });
  }
}