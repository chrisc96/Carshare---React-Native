import React, { Component } from 'react';
import {View, Button, Picker} from 'react-native';
import {FormLabel, FormInput, CheckBox} from 'react-native-elements';
import firebase from 'react-native-firebase';
import { PostARideHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import DatePicker from 'react-native-datepicker';
import styles from './post-a-ride-styles';

export default class PostARide extends Component {

  static navigationOptions = {
    title: PostARideHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

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
        <View style = {styles.form}>
          <FormLabel>Car to use:</FormLabel>
          <Picker
            selectedValue={this.state.selectedCarID}
            onValueChange={(carID) => this.onChange(carID)}>
            {carItems}
            <Picker.Item key={carItems.length} value='Add new car' label='Add new car' />
          </Picker>

          <FormLabel>Space for bags?</FormLabel>
          <CheckBox checked={this.state.storageAvail} onPress={() => this.setState({storageAvail: !this.state.storageAvail})}/>
          
          <FormLabel>No. Seats Available:</FormLabel>
          <FormInput value={'' + this.state.noSeats} onChangeText={text => this.convertToNum(text)} keyboardType = 'numeric'/>

        <FormLabel>No. Seats Available:</FormLabel>
        <FormInput value={'' + this.state.noSeats} onChangeText={text => this.convertToNum(text)} keyboardType='numeric' />

        <FormLabel>Meeting Place:</FormLabel>
        <FormInput value={this.state.meetingPoint} onChangeText={text => this.setState({ meetingPoint: text })} />

          <FormLabel>Departure Date:</FormLabel>
          <DatePicker date={this.state.departureDate} mode="date" confirmBtnText="Done" cancelBtnText="Cancel" onDateChange={(date) => {this.setState({departureDate: date})}}/>

          <FormLabel>Departure Time:</FormLabel>
          <DatePicker date={this.state.departureTime} mode="time" confirmBtnText="Done" cancelBtnText="Cancel" onDateChange={(time) => {this.setState({departureTime: time})}} />

        <FormLabel>Departure Time:</FormLabel>
        <DatePicker date={this.state.departureTime} mode="time" format="H:MM" confirmBtnText="Done" cancelBtnText="Cancel" onDateChange={(time) => { this.setState({ departureTime: time }) }} is24Hour={true} />

        <Button title={'Submit'} onPress={() => this.addListing()} />
      </View>
    );
  }
}
