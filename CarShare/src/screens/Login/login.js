import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import styles from './login-styles';
import { LoginHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import { errorTxtStyles } from '../../config/commonStyles';
import { NavigationActions, StackActions } from 'react-navigation';

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

        this.state = {
            email: '',
            password: '',
            formErrorText: '',
            loggedInPressed: false
        }
    }

    login() {
        if (this.state.email.length < 1 && this.state.password.length < 1) {
            this.setState({ formErrorText: 'Please enter an email and password' })
            return;
        }
        else if (this.state.email.length < 1) {
            this.setState({ formErrorText: 'Please enter an email' })
            return;
        }
        else if (this.state.password.length < 1) {
            this.setState({ formErrorText: 'Please enter a password' })
            return;
        }
        else {
            this.setState({ formErrorText: '' })
            this.setState({ loggedInPressed: true });
        }

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                this.setState({ loggedInPressed: false });
                // prevent back button from appearing
                this.props.navigation.dispatch(
                    StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'LoggedInTabs' })]
                    })
                )
            })
            .catch(error => {
                this.setState({
                    loggedInPressed: false,
                    password: '',
                    formErrorText: 'Your email or password was incorrect, please try again'
                });
            });
    }

    goToSignUp() {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={styles.loginContainer}>
                <Card
                    containerStyle={styles.loginCard}
                    titleStyle={styles.loginCardTitle}
                    dividerStyle={styles.divider}
                    title='Login'
                >

                    <FormLabel>EMAIL</FormLabel>
                    <FormInput
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

                    <Text style={[styles.indented, errorTxtStyles]}>
                        {this.state.formErrorText}
                    </Text>

                    {this.state.loggedInPressed ?
                        <Button
                            loading
                            buttonStyle={styles.loginBtn}
                        />
                        :
                        <Button
                            title="LOGIN"
                            onPress={() => this.login()}
                            buttonStyle={styles.loginBtn}
                        />
                    }

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