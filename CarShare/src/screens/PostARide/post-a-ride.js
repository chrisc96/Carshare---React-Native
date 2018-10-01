import React, { Component } from 'react';
import { View, Picker, ScrollView } from 'react-native';
import { FormLabel, FormInput, CheckBox, Card, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';

import styles from './post-a-ride-styles';

export default class PostARide extends Component {

  constructor() {
    super();
    this.firestoreListings = firebase.firestore().collection('listings');
    this.firestoreCars = firebase.firestore().collection('cars').where('userID', '==', firebase.auth().currentUser.uid)

    this.state = {
      listings: [],
      storageAvail: false,
      noSeats: 0,
      meetingPoint: '',
      destination: '',
      departureDate: '2018-10-05',
      departureTime: '07:28',
      cars: [],
      selectedCarID: ''
    }
  }

  componentDidMount() {
    this.firestoreCars.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (snapshot) => {
    const carsFromDB = [];
    snapshot.forEach((firestoreDocument) => {
      const { make, model, rego, userID, year } = firestoreDocument.data();

       carsFromDB.push({
         key: firestoreDocument.id,
         firestoreDocument,
         make,
         model,
         rego,
         userID,
         year
       });
    })

    this.setState({
      cars: carsFromDB
    });
  }

  addListing() {
    this.firestoreListings.add({
        userDocumentID: firebase.auth().currentUser.uid,
        carDocumentID: this.state.selectedCarID,
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
    var text = text.replace(/\D/g, '');
    var number = parseInt(text, 10)
    this.setState({ noSeats: number })
  }

  onChange(carID) {
    if (carID === 'Add new car') {
      this.goToAddACar();
    } else {
      this.setState({selectedCarID: carID})
    }
  }

  goToAddACar= () => {
    this.props.navigation.navigate('AddACar', { toPage: 'PostARide'})
  }

  render() {
    var carItems = this.state.cars.map((car, index) => {
      return <Picker.Item key={index} value={car.key} label={car.make + ' ' + car.model} />
    });

    return (
      <ScrollView>
        <View style={styles.form}>
          <Card
            containerStyle={styles.postARideCard}
            titleStyle={styles.postARideCardTitle}
            dividerStyle={styles.divider}
            title='Post a ride'
          >
            <FormLabel>CAR TO USE</FormLabel>
            <Picker
              selectedValue={this.state.selectedCarID}
              style={styles.indented}
              onValueChange={(carID) => this.onChange(carID)}>
              {carItems}
              <Picker.Item key={carItems.length} value='Add new car' label='Add new car' />
            </Picker>

            <FormLabel>SPACE FOR BAGS?</FormLabel>
            <CheckBox
              checked={this.state.storageAvail}
              onPress={() => this.setState({storageAvail: !this.state.storageAvail})}
            />

            <FormLabel>No. SEATS AVAILABLE</FormLabel>
            <FormInput
              value={'' + this.state.noSeats}
              onChangeText={text => this.convertToNum(text)} keyboardType = 'numeric'
            />

            <FormLabel>MEETING PLACE</FormLabel>
            <FormInput 
              value={this.state.meetingPoint}
              placeholder='Please enter meeting place...'
              onChangeText={text => this.setState({ meetingPoint: text })}
            />

            <FormLabel>DEPARTURE DATE</FormLabel>
            <DatePicker 
              date={this.state.departureDate}
              mode="date" 
              confirmBtnText="Done"
              cancelBtnText="Cancel" 
              style={[styles.indented, styles.datePicker]}
              onDateChange={(date) => {this.setState({departureDate: date})}}
            />

            <FormLabel>DEPARTURE TIME</FormLabel>
            <DatePicker
              date={this.state.departureTime}
              mode="time"
              confirmBtnText="Done"
              cancelBtnText="Cancel"
              style={[styles.indented, styles.datePicker]}
              onDateChange={(time) => {this.setState({departureTime: time})}}
            />

            <Button 
              title='POST'
              onPress={() => this.addListing()}
              buttonStyle={styles.postBtn}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}
