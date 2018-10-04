import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './ride-listing-styles';
import Listing from '../../components/Listing/listing';
import * as firestoreListings from '../../data/firestore-listings';

export default class RideListing extends Component {
  constructor() {
    super();

    this.state = {
        key: '',
        listingID: '',
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
    firestoreListings.getListing(this.props.navigation.state.params.key, (listing) => {
      this.setState({
        key: listing.listingID,
        listingID: listing.listingID,
        departureDate: listing.departureDate,
        departureTime: listing.departureTime,
        destination: listing.destination,
        meetingPoint: listing.meetingPoint,
        seatsAvailable: listing.seatsAvailable,
        storageSpace: listing.storageSpace,
        make: listing.make,
        model: listing.model,
        year: listing.year,
        firstName: listing.firstName,
        lastName: listing.lastName,
        contactNum: listing.contactNum,
        whoWantsToCome: listing.whoWantsToCome,
        whosComing: listing.whosComing,
        userDocumentID: listing.userDocumentID
      })
    })
  }

  render() {
    return (
      <View style={styles.listing}>
        <Listing {...this.state} showRequestToShare={true} navigation={this.props.navigation} screenProps={this.props.screenProps}/>
      </View>
    )
  }
}