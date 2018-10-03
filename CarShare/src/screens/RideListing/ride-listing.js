import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './ride-listing-styles'
import { RideListingHeaderTitle } from './../../config/constants';
import { headerTextColour, normalFontWeight } from '../../config/global-styles';
import Listing from '../../components/Listing/listing';

export default class RideListing extends Component {

  static navigationOptions = {
    title: RideListingHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  constructor(props) {
    super(props);
    this.firestoreListings = firebase.firestore().doc('listings/' + props.navigation.state.params.key);
    this.state = {
      key: '',
      departureDate: '',
      departureTime: '',
      destination: '',
      meetingPoint: '',
      seatsAvailable: '',
      storageSpace: '',
      make: '',
      model: '',
      year: '',
      firstName: '',
      lastName: '',
      contactNum: '',
      whoWantsToCome: [],
      whosComing: [],
      userDocumentID: ''
    }
  }

  componentDidMount() {
    this.firestoreListings.onSnapshot(this.onDocumentUpdate)
  }

  onDocumentUpdate = (firestoreDocument) => {
    const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, userDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();

    firebase.firestore().doc('cars/' + carDocumentID).onSnapshot((carDocument) => {
      if (!carDocument.data()) return;
      const { make, model, year } = carDocument.data();

      firebase.firestore().doc('users/' + userDocumentID).onSnapshot((userDocument) => {
        if (!userDocument.data()) return;
        const { firstName, lastName, contactNum } = userDocument.data();

        let listingID = firestoreDocument._ref._documentPath._parts[1]
        this.setState({
          key: listingID,
          listingID,
          departureDate: departureDate,
          departureTime: departureTime,
          destination: destination,
          meetingPoint: meetingPoint,
          seatsAvailable: seatsAvailable,
          storageSpace: storageSpace,
          make: make,
          model: model,
          year: year,
          firstName: firstName,
          lastName: lastName,
          contactNum: contactNum,
          whoWantsToCome: whoWantsToCome,
          whosComing: whosComing,
          userDocumentID: userDocumentID
        });
      })
    });
  }

  render() {
    return (
      <View style={styles.listing}>
        <Listing {...this.state} showRequestToShare={this.props.navigation.state.params.showRequestToShare} navigation={this.props.navigation} />
      </View>
    )
  }
  
}