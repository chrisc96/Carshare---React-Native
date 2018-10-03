import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './find-a-ride-styles'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'

import { listingContains } from '../../config/utils';
import { FindARideHeaderTitle } from './../../config/constants';
import { headerTextColour, normalFontWeight } from '../../config/global-styles';
import Listing from '../../components/Listing/listing';

export default class FindARide extends Component {

  static navigationOptions = {
    headerTitle: FindARideHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  constructor(props) {
    super(props);
    
    this.firestoreListings = firebase.firestore().collection('listings');
    this.onChangeTextDelayed = _.debounce(this.searchBarChanged, 350);

    this.state = {
      listings: [],
      filteredData: [],
      searchBarEmpty: true,
      noData: false
    }
  }

  componentDidMount() {
    this.firestoreListings.onSnapshot(this.onCollectionUpdate);
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
            });
          }
        })
      })
    });
  }

  searchBarChanged(inputSearch) {
    let searchValue = inputSearch.toLowerCase();
    if (!searchValue || searchValue === undefined || searchValue === "") {
      this.setState({
        searchBarEmpty: true
      })
      return;
    }
    else {
      this.setState({
        searchBarEmpty: false
      })
    }

    const data = _.filter(this.state.listings, listing => {
      return listingContains(listing, searchValue);
    })

    if (data.length === 0) {
      this.setState({
        noData: true,
        filteredData: []
      })
    }
    else {
      this.setState({
        noData: false,
        filteredData: data
      })
    }
  }

  goToListing(key) {
    this.props.navigation.navigate('RideListing', { key: key });
  }

  render() {
    var listingContainer = this.props.loggedOut ? styles.listingContainer : styles.loggedOutListingContainer

    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={this.onChangeTextDelayed.bind(this)}
          placeholder='Search Listings'
          containerStyle={styles.searchBarContainer}
          inputStyle={{
            backgroundColor: 'white',
          }}
        />

        <View style={listingContainer}>
          {this.state.searchBarEmpty ?
            <FlatList data={this.state.listings} onPress={() => goToHome()} renderItem={({ item }) =>  {
                return (
                  <TouchableHighlight onPress={() => this.goToListing(item.key)}>
                    <Listing {...item} showRequestToShare={false}/>
                  </TouchableHighlight>
                )
              }}/> :
            this.state.noData ?
              <Text style="styles.noListingsTxt">No listings found by that search</Text> :
              <FlatList data={this.state.filteredData} renderItem={({ item }) =>  {
                return (
                  <TouchableHighlight onPress={() => this.goToListing(item.key)}>
                    <Listing {...item} showRequestToShare={false}/>
                  </TouchableHighlight>
                )
              }}/>
          }
        </View>
      </View>
    )
  }
}