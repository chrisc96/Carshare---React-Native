import React, { Component } from 'react';
import { View, Picker, ScrollView, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, CheckBox, Card, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';
import { PostARideHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import { errorTxtStyles, lightGreenButton } from '../../config/commonStyles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
      storageAvail: false,
      noSeats: 0,
      meetingPoint: '',
      destination: '',
      departureDate: '2018-10-05',
      departureTime: '07:28',
      cars: [],
      selectedCarID: '',
      postBtnPressed: false,
      reqBeingSent: false
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
    this.setState({ postBtnPressed: true });

    if (this.formValid()) {
      this.setState({ reqBeingSent: true });

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
      })
        .then((response) => {
          this.clearFields();
        })
        .catch((error) => {
          this.setState({ signupBtnPressed: false })
          this.setState({ reqBeingSent: false })
        })
    }
  }

  clearFields() {
    this.setState({
      storageAvail: false,
      noSeats: 0,
      meetingPoint: '',
      destination: '',
      departureDate: '2018-10-05',
      departureTime: '07:28',
      selectedCarID: '',
      postBtnPressed: false,
      reqBeingSent: false
    })
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
      this.setState({ selectedCarID: carID })
    }
  }

  goToAddACar = () => {
    this.props.navigation.navigate('AddACar')
  }

  formValid() {
    return this.state.selectedCarID &&
      this.state.meetingPoint.length > 0 &&
      this.state.destination.length > 0
  }

  render() {
    console.log(this.state.meetingPoint, this.state.destination)
    var carItems = this.state.cars.map((car, index) => {
      return <Picker.Item key={index + 1} value={car.key} label={car.make + ' ' + car.model} />
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
              <Picker.Item key={0} value='' label='Please select car...' />
              {carItems}
              <Picker.Item key={carItems.length + 1} value='Add new car' label='Add new car' />
            </Picker>
            <Text style={[styles.indented, errorTxtStyles]}>
              {!this.state.selectedCarID && this.state.postBtnPressed ? "Please select a car" : ""}
            </Text>

            <FormLabel>SPACE FOR BAGS?</FormLabel>
            <CheckBox
              checked={this.state.storageAvail}
              onPress={() => this.setState({ storageAvail: !this.state.storageAvail })}
            />

            <FormLabel>No. SEATS AVAILABLE</FormLabel>
            <FormInput
              value={'' + this.state.noSeats}
              onChangeText={text => this.convertToNum(text)} keyboardType='numeric'
            />

            <FormLabel>MEETING PLACE</FormLabel>
            {this.meetingPlaceAutoComplete()}
            <Text style={[styles.indented, errorTxtStyles]}>
              {this.state.meetingPoint.length === 0 && this.state.postBtnPressed ? "Please enter a meeting point" : ""}
            </Text>

            <FormLabel>DESTINATION</FormLabel>
            {this.destinationAutoComplete()}
            <Text style={[styles.indented, errorTxtStyles]}>
              {this.state.destination.length === 0 && this.state.postBtnPressed ? "Please enter a destination" : ""}
            </Text>


            <FormLabel>DEPARTURE DATE</FormLabel>
            <DatePicker
              date={this.state.departureDate}
              mode="date"
              confirmBtnText="Done"
              cancelBtnText="Cancel"
              style={[styles.indented, styles.datePicker]}
              onDateChange={(date) => { this.setState({ departureDate: date }) }}
            />

            <FormLabel>DEPARTURE TIME</FormLabel>
            <DatePicker
              date={this.state.departureTime}
              mode="time"
              confirmBtnText="Done"
              cancelBtnText="Cancel"
              style={[styles.indented, styles.datePicker]}
              onDateChange={(time) => { this.setState({ departureTime: time }) }}
            />

            {this.state.reqBeingSent ?
              <Button
                loading
                buttonStyle={lightGreenButton}
              /> :
              <Button
                title='POST'
                onPress={() => this.addListing()}
                buttonStyle={lightGreenButton}
              />
            }

          </Card>
        </View>
      </ScrollView>
    );
  }


  meetingPlaceAutoComplete = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Enter a meeting point'
        minLength={2}
        autoFocus={false}
        listViewDisplayed='auto'
        returnKeyType={'default'}
        fetchDetails={true}
        listViewDisplayed={false}
        onPress={(data, details = null) => {
          this.setState({ meetingPoint: data.description })
        }}
        query={{
          key: 'AIzaSyBlFRuN8KbZssVHaIcC-gnCIA4pTVrYu_w',
          language: 'en',
        }}

        styles={{
          indented: {
            margin: 10,
            paddingLeft: '3%'
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
        }}
        currentLocation={false}
        debounce={300}
      />
    )
  }

  destinationAutoComplete = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Enter a destination'
        minLength={2}
        autoFocus={false}
        listViewDisplayed='auto'
        returnKeyType={'default'}
        fetchDetails={true}
        listViewDisplayed={false}
        onPress={(data, details = null) => {
          this.setState({ destination: data.description })
        }}
        query={{
          key: 'AIzaSyBlFRuN8KbZssVHaIcC-gnCIA4pTVrYu_w',
          language: 'en',
        }}

        styles={{
          indented: {
            margin: 10,
            paddingLeft: '3%'
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
        }}
        currentLocation={false}
        debounce={300}
      />
    )
  }

}
