import React, {Component} from 'react';
import {View, Button} from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component {
    constructor() {
        super();
        this.firestoreUsers = firebase.firestore().collection('users');
    
        this.state = {
            email: '',
            password: ''
        }
    }

    login = () => {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {

        });
    }

    render() {
      return (
        <View style={styles.form}>
            <FormLabel>Email:</FormLabel>
            <FormInput value={this.state.email} onChangeText={text => this.setState({ email: text })}/>

            <FormLabel>Password:</FormLabel>
            <FormInput value={this.state.password} secureTextEntry onChangeText={password => this.setState({ password: password })}/>
            
            <Button title="Login" onPress={this.login} />
        </View>
      )
    }
}