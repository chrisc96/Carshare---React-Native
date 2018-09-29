import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import {FormLabel, FormInput} from 'react-native-elements';
import firebase from 'react-native-firebase';
import styles from './sign-up-styles'

export default class SignUp extends Component {
    constructor(props) {
        super();
        this.firestoreUsers = firebase.firestore().collection('users');
        this.pageToGoTo = props.navigation.state.params.toPage;

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contactNum: '',
            formErrorText: ''
        }
    }

    signUp() {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                this.firestoreUsers.doc(response.user.uid).set({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    contactNum: this.state.contactNum
                })
                this.props.navigation.pop();
                this.props.navigation.pop();
                this.props.navigation.navigate(this.pageToGoTo);
            })
            .catch(error => {
                this.setState({ formErrorText: 'Invalid details, please try again' });
            });
    }

    render() {
        return (
          <View style={styles.form}>
            <FormLabel>Email:</FormLabel>
            <FormInput value={this.state.email} onChangeText={text => this.setState({ email: text })}/>

            <FormLabel>Password:</FormLabel>
            <FormInput value={this.state.password} secureTextEntry onChangeText={password => this.setState({ password: password })}/>

            <FormLabel>First name:</FormLabel>
            <FormInput value={this.state.firstName} onChangeText={text => this.setState({ firstName: text })}/>

            <FormLabel>Last name:</FormLabel>
            <FormInput value={this.state.lastName} onChangeText={text => this.setState({ lastName: text })}/>

            <FormLabel>Contact number:</FormLabel>
            <FormInput value={this.state.contactNum} onChangeText={text => this.setState({ contactNum: text })}/>
            <Text>{this.state.formErrorText}</Text>
            
            <Button title="Sign Up" onPress={() => this.signUp()} />
          </View>
        )
    }
}