import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import firebase from 'react-native-firebase';
import styles from './post-a-ride-styles'

export default class PostARide extends Component {
  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings');

    this.state = {
      listings: [],
      meetingPoint: ''
    }
  }

  addListing() {
    this.firestoreListings.add({
        timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
        meetingPoint: this.state.meetingPoint,
        destination: 'e',
        departureDate: '2018-08-24',
        departureTime: '08:36',
        seatsAvailable: 3,
        storageSpace: true,
        whoWantsToCome: [],
        whosComing: []
    });
  }

  render() {
    return (
        <View style = {styles.listings}>
           <FormLabel>Meeting Place</FormLabel>
           <FormInput name="meetingPoint" value={this.state.meetingPoint} onChangeText={text => this.setState({meetingPoint: text})}/>
          <Button
            title={'Submit'}
            onPress={() => this.addListing()}
          />
        </View>
      );
  }
}
