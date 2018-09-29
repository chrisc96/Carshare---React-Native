import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import {FormLabel, FormInput} from 'react-native-elements';
import firebase from 'react-native-firebase';
import styles from './login-styles';

export default class Login extends Component {
    constructor(props) {
        super();
        this.firestoreUsers = firebase.firestore().collection('users');
        this.pageToGoTo = props.navigation.state.params.toPage;

        this.state = {
            email: '',
            password: '',
            formErrorText: ''
        }
    }

    login() {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
            this.props.navigation.pop();
            this.props.navigation.navigate(this.pageToGoTo);
        })
        .catch(error => {
            this.setState({ password: '',
                formErrorText: 'Your email or password was incorrect, please try again' });
        });
    }

    goToSignUp() {
        this.props.navigation.navigate('SignUp', { toPage: this.pageToGoTo});
    }

    render() {
      return (
        <View style={styles.form}>
            <FormLabel>Email:</FormLabel>
            <FormInput value={this.state.email} onChangeText={text => this.setState({ email: text })}/>

            <FormLabel>Password:</FormLabel>
            <FormInput value={this.state.password} secureTextEntry onChangeText={password => this.setState({ password: password })}/>
            <Text>{this.state.formErrorText}</Text>
            
            <Button title="Login" onPress={() => this.login()}/>
            <Button title="Don't have an account? Sign up here" onPress={() => this.goToSignUp()}/>
        </View>
      )
    }
}