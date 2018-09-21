import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import firebase from 'react-native-firebase';
import Listing from '../components/listing';

export default class FindARide extends Component {
  constructor() {
    super();
    this.ref=firebase.firestore().collection('listings');
    this.unsubscribe = null;

    this.state = {
        listings: [],
        loading: true
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    }

componentWillUnmount() {
    this.unsubscribe();
}

  onCollectionUpdate = (querySnapshot) => {
    const listings = [];
    querySnapshot.forEach((doc) => {
      const { carDocumentID, destination } = doc.data();
      listings.push({
        key: doc.id,
        doc, // DocumentSnapshot
        carDocumentID,
        destination,
      });
    });
    this.setState({ 
      listings,
      loading: false,
   });
  }


  render() {
    if (this.state.loading) {
        return null
    }
    return (
        
        <View>
            <FlatList
        data={this.state.listings}
        renderItem={({ item }) => <Listing {...item} />}
      />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});
