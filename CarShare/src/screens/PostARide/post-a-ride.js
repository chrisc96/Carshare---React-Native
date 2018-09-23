import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import { FormLabel, FormInput, CheckBox } from 'react-native-elements';
import firebase from 'react-native-firebase';
import styles from './post-a-ride-styles'

export default class PostARide extends Component {
  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings');

    this.state = {
      listings: [],
      storageAvail: false,
      noSeats: 0,
      meetingPoint: '',
      destination: '',
      departureDate: '',
      departureTime: ''
    }
  }

  addListing() {
    this.firestoreListings.add({
        timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
        meetingPoint: this.state.meetingPoint,
        destination: this.state.destination,
        departureDate: this.state.departureDate,
        departureTime: this.state.departureTime,
        seatsAvailable: this.state.noSeats,
        storageSpace: this.state.storageAvail,
        whoWantsToCome: [],
        whosComing: []
    });
  }

  render() {
    return (
        <View style = {styles.listings}>
          <FormLabel>Space for bags?</FormLabel>
          <CheckBox checked={this.state.storageAvail} onPress={() => this.setState({storageAvail: !this.state.storageAvail})} />
          
          <FormLabel>No. Seats Available:</FormLabel>
          

          <FormLabel>Meeting Place:</FormLabel>
          <FormInput name="meetingPoint" value={this.state.meetingPoint} onChangeText={text => this.setState({meetingPoint: text})}/>

          <FormLabel>Destination:</FormLabel>
          <FormInput name="destination" value={this.state.destination} onChangeText={text => this.setState({destination: text})}/>

          <FormLabel>Departure Date:</FormLabel>
          <FormInput name="departureDate" value={this.state.departureDate} onChangeText={text => this.setState({departureDate: text})}/>

          <FormLabel>Departure Time:</FormLabel>
          <FormInput name="departureTime" value={this.state.departureTime} onChangeText={text => this.setState({departureTime: text})}/>

          <Button
            title={'Submit'}
            onPress={() => this.addListing()}
          />
        </View>
      );
  }
}
