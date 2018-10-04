import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';

import styles from './sign-up-styles';
import { errorTxtStyles, lightGreenButton } from '../../config/commonStyles';
import * as auth from '../../data/auth';
import * as firestoreUsers from '../../data/firestore-users';

export default class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contactNum: '',
            signupBtnPressed: false,
            reqBeingSent: false
        }
    }

    signUp() {
        this.setState({ signupBtnPressed: true });

        if (this.formValid()) {
            this.setState({ reqBeingSent: true })
            auth.signUp(this.state.email, this.state.password)
                .then((response) => {
                    this.setState({ signupBtnPressed: false })

                    firestoreUsers.setUser(response, this.state.firstName, this.state.lastName, this.state.contactNum);
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
                    this.setState({ signupBtnPressed: false })
                    this.setState({ reqBeingSent: false })
                });
        }
    }

    formValid() {
        return this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.firstName.length > 0 &&
            this.state.lastName.length > 0 &&
            this.state.contactNum.length > 0
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.form}>
                    <Card
                        containerStyle={styles.signupCard}
                        titleStyle={styles.signupCardTitle}
                        dividerStyle={styles.divider}
                        title='Sign Up'
                    >

                        <FormLabel
                            containerStyle={styles.inputBox}
                        >
                            EMAIL
                    </FormLabel>
                        <FormInput
                            value={this.state.email}
                            containerStyle={styles.inputBox}
                            placeholder='Please enter your email...'
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Text
                            style={[styles.indented, errorTxtStyles]}
                        >
                            {this.state.email.length === 0 && this.state.signupBtnPressed ? "Please enter an email" : ""}
                        </Text>

                        <FormLabel>PASSWORD</FormLabel>
                        <FormInput
                            secureTextEntry
                            value={this.state.password}
                            placeholder='Please enter your password...'
                            onChangeText={password => this.setState({ password: password })}
                        />
                        <Text style={[styles.indented, errorTxtStyles]}>
                            {this.state.password.length === 0 && this.state.signupBtnPressed ? "Please enter a password" : ""}
                        </Text>


                        <FormLabel>FIRST NAME</FormLabel>
                        <FormInput
                            value={this.state.firstName}
                            placeholder='Please enter your first name...'
                            onChangeText={text => this.setState({ firstName: text })}
                        />
                        <Text style={[styles.indented, errorTxtStyles]}>
                            {this.state.firstName.length === 0 && this.state.signupBtnPressed ? "Please enter your first name" : ""}
                        </Text>

                        <FormLabel>LAST NAME</FormLabel>
                        <FormInput
                            value={this.state.lastName}
                            placeholder='Please enter your last name...'
                            onChangeText={text => this.setState({ lastName: text })}
                        />
                        <Text style={[styles.indented, errorTxtStyles]}>
                            {this.state.lastName.length === 0 && this.state.signupBtnPressed ? "Please enter your last name" : ""}
                        </Text>

                        <FormLabel>CONTACT NUMBER</FormLabel>
                        <FormInput
                            value={this.state.contactNum}
                            placeholder='Please enter your contact number...'
                            onChangeText={text => this.setState({ contactNum: text })} />
                        <Text style={[styles.indented, errorTxtStyles]}>
                            {this.state.password.length === 0 && this.state.signupBtnPressed ? "Please enter a contact number" : ""}
                        </Text>

                        {this.state.reqBeingSent ?
                            <Button
                                loading
                                buttonStyle={lightGreenButton}
                            /> :
                            <Button
                                title="SIGN UP"
                                onPress={() => this.signUp()}
                                buttonStyle={lightGreenButton}
                            />
                        }
                    </Card>
                </View>
            </ScrollView>
        )
    }
}