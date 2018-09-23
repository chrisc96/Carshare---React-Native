import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {FormLabel, FormInput, CheckBox} from 'react-native-elements';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';
import styles from './post-a-ride-styles';

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

  convertToNum(text) {
    var text = text.replace(/\D/g,'');
    var number = parseInt(text, 10)
    this.setState({noSeats: number})
  }

  render() {
    return (
        <View style = {styles.listings}>
          <FormLabel>Space for bags?</FormLabel>
          <CheckBox checked={this.state.storageAvail} onPress={() => this.setState({storageAvail: !this.state.storageAvail})}/>
          
          <FormLabel>No. Seats Available:</FormLabel>
          <FormInput value={'' + this.state.noSeats} onChangeText={text => this.convertToNum(text)} keyboardType = 'numeric'/>

          <FormLabel>Meeting Place:</FormLabel>
          <FormInput value={this.state.meetingPoint} onChangeText={text => this.setState({meetingPoint: text})}/>

          <FormLabel>Destination:</FormLabel>
          <FormInput value={this.state.destination} onChangeText={text => this.setState({destination: text})}/>

          <FormLabel>Departure Date:</FormLabel>
          <DatePicker date={this.state.departureDate} mode="date" format="DD-MM-YYYY" confirmBtnText="Done" cancelBtnText="Cancel" onDateChange={(date) => {this.setState({departureDate: date})}}/>

          <FormLabel>Departure Time:</FormLabel>
          <DatePicker date={this.state.departureTime} mode="time" format="H:MM" confirmBtnText="Done" cancelBtnText="Cancel" onDateChange={(time) => {this.setState({departureTime: time})}} is24Hour={true}/>

          <Button title={'Submit'} onPress={() => this.addListing()}/>
        </View>
      );
  }
}
