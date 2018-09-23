import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './find-a-ride-styles'
import { SearchBar } from 'react-native-elements'
import _ from 'lodash'

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
    this.search = React.createRef();
    this.firestoreListings = firebase.firestore().collection('listings');
    this.onChangeTextDelayed = _.debounce(this.searchBarChanged, 350);

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

  searchBarChanged(inputSearch) {
    
  }

  render() {
    return (
      <View style={styles.container}>

        <SearchBar
          onChangeText={this.onChangeTextDelayed}
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
          {}
          <FlatList data={this.state.listings} renderItem={({ item }) => <Listing {...item} />} />
        </View>
      </View>
    );
  }
}