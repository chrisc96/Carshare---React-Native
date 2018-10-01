import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { AddACarHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import styles from './add-a-car-styles';
import { lightBlueButton } from '../../config/commonStyles';

export default class AddACar extends Component {

  static navigationOptions = {
    title: AddACarHeaderTitle,
    headerTintColor: headerTextColour,
    headerTitleStyle: {
      fontWeight: normalFontWeight,
    }
  }

  constructor(props) {
    super();
    this.firestoreCars = firebase.firestore().collection('cars');

    this.state = {
      make: '',
      model: '',
      rego: '',
      year: ''
    }
  }

  addCar() {
    // Add validation here before sending new car
    
    this.firestoreCars.add({
      make: this.state.make,
      model: this.state.model,
      rego: this.state.rego,
      userID: firebase.auth().currentUser.uid,
      year: this.state.year
    })
      .then(response => {
        this.props.navigation.navigate('PostARide');
      })
      .catch(error => {

      });
  }

  render() {
    return (
      <View style={styles.form}>

        <ScrollView>
          <Card
            containerStyle={styles.listingCard}
            dividerStyle={styles.divider}
          >

            <FormLabel>Make:</FormLabel>
            <FormInput
              value={this.state.make}
              placeholder="Please enter your car's make..."
              onChangeText={text => this.setState({ make: text })} />

            <FormLabel>Model:</FormLabel>
            <FormInput
              value={this.state.model}
              placeholder="Please enter your car's model..."
              onChangeText={text => this.setState({ model: text })} />

            <FormLabel>Car Registration:</FormLabel>
            <FormInput
              value={this.state.rego}
              placeholder="Please enter your car's registration number..."
              onChangeText={text => this.setState({ rego: text })} />

            <FormLabel>Year:</FormLabel>
            <FormInput
              value={this.state.year}
              placeholder="Please enter your car's year..."
              onChangeText={text => this.setState({ year: text })} />

            <Button
              title='Submit'
              buttonStyle={lightBlueButton}
              onPress={() => this.addCar()} />

          </Card>
        </ScrollView>
      </View>
    );
  }
}
