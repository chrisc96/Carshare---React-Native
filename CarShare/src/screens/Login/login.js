import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import styles from './login-styles';
import { LoginHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import { errorTxtStyles } from '../../config/commonStyles';

export default class Login extends Component {

    static navigationOptions = {
        headerTitle: LoginHeaderTitle,
        headerTintColor: headerTextColour,
        headerTitleStyle: {
            fontWeight: normalFontWeight,
        }
    }

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
            .then(response => {
                this.props.navigation.pop();
                this.props.navigation.navigate(this.pageToGoTo);
            })
            .catch(error => {
                this.setState({
                    password: '',
                    formErrorText: 'Your email or password was incorrect, please try again'
                });
            });
    }

    goToSignUp() {
        this.props.navigation.navigate('SignUp', { toPage: this.pageToGoTo });
    }

    render() {
        return (
            <View style={styles.loginContainer}>
                <Card
                    containerStyle={styles.loginCard}
                    titleStyle={styles.loginCardTitle}
                    dividerStyle={styles.divider}
                    title='Login'>

                    <FormLabel>EMAIL</FormLabel>
                    <FormInput
                        autoComplete=""
                        value={this.state.email}
                        placeholder='Please enter your email...'
                        onChangeText={text => this.setState({ email: text })}
                    />

                    <FormLabel>PASSWORD</FormLabel>
                    <FormInput
                        secureTextEntry
                        value={this.state.password}
                        placeholder='Please enter your password...'
                        onChangeText={password => this.setState({ password: password })}
                    />

                    <Text>{this.state.formErrorText}</Text>

                    <Button
                        title="LOGIN"
                        onPress={() => this.login()}
                        backgroundColor='#03A9F4'
                    />

                    <View
                        style={styles.separator}
                    />

                    <Button
                        title="SIGN UP"
                        onPress={() => this.goToSignUp()}
                        backgroundColor='#84d140'
                    />
                </Card>
            </View>
        )
    }
}