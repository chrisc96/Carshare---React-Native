import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { AddACarHeaderTitle } from './../../config/constants';
import { headerTextColour, normalFontWeight } from '../../config/global-styles';
import styles from './add-a-car-styles';
import { errorTxtStyles, lightGreenButton } from '../../config/commonStyles';

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
      year: '',
      addBtnPressed: false,
      reqBeingSent: false
    }
  }

  addCar() {
    this.setState({ addBtnPressed: true })
    
    if (this.formValid()) {
      this.setState({ reqBeingSent: true });
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
          this.setState({ addBtnPressed: false })
          this.setState({ reqBeingSent: false })
        });
    }
  }

  formValid() {
    return this.state.make.length > 0 &&
      this.state.model.length > 0 &&
      this.state.year.length > 0 &&
      this.state.rego.length > 0
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.form}>
          <Card
            containerStyle={styles.addACarCard}
            titleStyle={styles.addACarCardTitle}
            dividerStyle={styles.divider}
            title='Add a car'
          >

            <FormLabel>MAKE</FormLabel>
            <FormInput
              value={this.state.make}
              placeholder="Please enter your car's make..."
              onChangeText={text => this.setState({ make: text })}
            />
            <Text style={[styles.indented, errorTxtStyles]}>
              {this.state.make.length === 0 && this.state.addBtnPressed ? "Please enter a make" : ""}
            </Text>

            <FormLabel>MODEL</FormLabel>
            <FormInput
              value={this.state.model}
              placeholder="Please enter your car's model..."
              onChangeText={text => this.setState({ model: text })}
            />
            <Text style={[styles.indented, errorTxtStyles]}>
              {this.state.model.length === 0 && this.state.addBtnPressed ? "Please enter a model" : ""}
            </Text>

            <FormLabel>CAR REGISTRATION</FormLabel>
            <FormInput
              value={this.state.rego}
              placeholder="Please enter your car's registration number..."
              onChangeText={text => this.setState({ rego: text })}
            />
            <Text style={[styles.indented, errorTxtStyles]}>
              {this.state.rego.length === 0 && this.state.addBtnPressed ? "Please enter a registration" : ""}
            </Text>

            <FormLabel>YEAR</FormLabel>
            <FormInput
              value={this.state.year}
              placeholder="Please enter your car's year..."
              onChangeText={text => this.setState({ year: text })}
            />
            <Text style={[styles.indented, errorTxtStyles]}>
              {this.state.year.length === 0 && this.state.addBtnPressed ? "Please enter a year" : ""}
            </Text>

            {this.state.reqBeingSent ?
              <Button
                loading
                buttonStyle={lightGreenButton}
              /> :
              <Button
                title='ADD'
                onPress={() => this.addCar()}
                buttonStyle={lightGreenButton}
              />
            }

          </Card>
        </View>
      </ScrollView>
    );
  }
}
