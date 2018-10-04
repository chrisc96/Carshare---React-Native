import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import styles from './find-a-ride-styles'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'

import { listingContains } from '../../config/utils';
import Listing from '../../components/Listing/listing';
import * as firestoreListings from '../../data/firestore-listings';

export default class FindARide extends Component {

  constructor(props) {
    super(props);

    this.onChangeTextDelayed = _.debounce(this.searchBarChanged, 350);

    this.state = {
      listings: [],
      filteredData: [],
      searchBarEmpty: true,
      noData: false
    }
  }

  componentDidMount() {
    firestoreListings.getListings((listings) => {
      this.setState({ listings: listings })
    })
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
    this.props.navigation.navigate('RideListing', { key: key, showRequestToShare: true});
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
            <FlatList data={this.state.listings} onPress={() => goToHome()} renderItem={({ item }) => {
              return (
                <TouchableHighlight onPress={() => this.goToListing(item.key)}>
                  <Listing {...item} showRequestToShare={false} />
                </TouchableHighlight>
              )
            }} /> :
            this.state.noData ?
              <Text style="styles.noListingsTxt">No listings found by that search</Text> :
              <FlatList data={this.state.filteredData} renderItem={({ item }) => {
                return (
                  <TouchableHighlight onPress={() => this.goToListing(item.key)}>
                    <Listing {...item} showRequestToShare={false}/>
                  </TouchableHighlight>
                )
              }} />
          }
        </View>
      </View>
    )
  }
}