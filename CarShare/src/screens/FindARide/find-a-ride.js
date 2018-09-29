import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './find-a-ride-styles'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'
import { listingContains } from '../../config/utils'
import Listing from '../../components/Listing/listing';
import { FindARideHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'

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
    this.firestoreListings.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (snapshot) => {
    const listingsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { departureDate, departureTime, destination, meetingPoint, seatsAvailable, storageSpace, carDocumentID, userDocumentID, whoWantsToCome, whosComing } = firestoreDocument.data();
      
      firebase.firestore().doc('cars/' + carDocumentID).onSnapshot(function(carDocument) {
        if (!carDocument.data()) return;
        const { make, model, year } = carDocument.data();

        firebase.firestore().doc('users/' + userDocumentID).onSnapshot(function(userDocument) {
          if (!userDocument.data()) return;
          const { firstName, lastName, contactNum } = userDocument.data();
          
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
            year,
            firstName,
            lastName,
            contactNum
          });
        })
      })
    });

    this.setState({
      listings: listingsFromDB,
      filteredData: listingsFromDB
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

  render() {
    return (
      <View style={styles.container}>

        <SearchBar
          onChangeText={this.onChangeTextDelayed.bind(this)}
          placeholder='Search Listings'
          containerStyle={{
            backgroundColor: "#FFF",
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            marginTop: 10,
            marginLeft: -15,
            marginRight: -15,
            marginBottom: 10,
          }}
          inputStyle={{
            backgroundColor: 'white',
          }}
        />

        <View style={styles.listings}>
          {this.state.searchBarEmpty ?
            <FlatList data={this.state.listings} renderItem={({ item }) => <Listing {...item} />}/> :
            this.state.noData ? 
              <Text>No Listings Found</Text> :
              <FlatList data={this.state.filteredData} renderItem={({ item }) => <Listing {...item} />}/>
          }
        </View>
      </View>
    );
  }
}