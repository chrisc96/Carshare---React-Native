import React, {Component} from 'react';
import {View, Button, Picker} from 'react-native';
import {FormLabel, FormInput, CheckBox} from 'react-native-elements';
import firebase from 'react-native-firebase';
import { AddACarHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import styles from './add-a-car-styles';

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
    this.pageToGoTo = props.navigation.state.params.toPage;

    this.state = {
      make: '',
      model: '',
      rego: '',
      year: ''
    }
  }

  addCar(){
    this.firestoreCars.add({
        make: this.state.make,
        model: this.state.model,
        rego: this.state.rego,
        userID: firebase.auth().currentUser.uid,
        year: this.state.year
    })
    .then(response => {
        this.props.navigation.navigate(this.pageToGoTo);
    })
    .catch(error => {
        
    });
  }

  render() {
    return (
        <View style = {styles.form}>

          <FormLabel>Make:</FormLabel>
          <FormInput value={this.state.make} onChangeText={text => this.setState({make: text})}/>

          <FormLabel>Model:</FormLabel>
          <FormInput value={this.state.model} onChangeText={text => this.setState({model: text})}/>

          <FormLabel>Car Registration:</FormLabel>
          <FormInput value={this.state.rego} onChangeText={text => this.setState({rego: text})}/>

          <FormLabel>Year:</FormLabel>
          <FormInput value={this.state.year} onChangeText={text => this.setState({year: text})}/>

          <Button title='Submit' onPress={() => this.addCar()}/>
        </View>
      );
  }
}
