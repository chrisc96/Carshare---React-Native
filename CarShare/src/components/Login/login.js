import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';

import styles from './login-styles';
import { errorTxtStyles, lightGreenButton, lightBlueButton } from '../../config/commonStyles';
import * as auth from '../../data/auth';

export default class Login extends Component {
    constructor() {
        super();

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

        auth.login(this.state.email, this.state.password)
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
                            buttonStyle={lightBlueButton}
                        />
                        :
                        <Button
                            title="LOGIN"
                            onPress={() => this.login()}
                            buttonStyle={lightBlueButton}
                        />
                    }

                    <View
                        style={styles.separator}
                    />

                    <Button
                        title="SIGN UP"
                        onPress={() => this.goToSignUp()}
                        buttonStyle = {lightGreenButton}
                    />
                </Card>
            </View>
        )
    }
}