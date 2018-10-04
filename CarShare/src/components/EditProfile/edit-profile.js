import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';

import styles from './edit-profile-styles';
import { lightGreenButton } from '../../config/commonStyles';
import * as firestoreUsers from '../../data/firestore-users';

export default class EditProfile extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            contactNum: '',
            originalFirstName: '',
            originalLastName: '',
            originalContactNum: '',
            reqBeingSent: false
        }
    }

    componentDidMount() {
        firestoreUsers.getUser(this.props.screenProps.user.uid, (listing) => {
            this.setState({
                firstName: listing.firstName,
                lastName: listing.lastName,
                contactNum: listing.contactNum,
                originalFirstName: listing.firstName,
                originalLastName: listing.lastName,
                originalContactNum: listing.contactNum
            })
        });
    }

    goToProfile() {
        this.props.navigation.navigate('Profile');
    }

    updateProfile() {
        this.setState({ reqBeingSent: true });

        var firstName = this.state.firstName ? this.state.firstName : this.state.originalFirstName;
        var lastName = this.state.lastName ? this.state.lastName : this.state.originalLastName;
        var contactNum = this.state.contactNum ? this.state.contactNum : this.state.originalContactNum;

        firestoreUsers.updateUser(this.props.screenProps.user.uid, firstName, lastName, contactNum, (success) => {
            if (success) {
                this.setState({ reqBeingSent: false })
                this.goToProfile();
            } else {
                this.setState({ reqBeingSent: false })
            }
        })
    }

    render() {
        return (
            <View style={styles.details}>
                <Card
                    containerStyle={styles.profileCard}
                    titleStyle={styles.profileTitle}
                    dividerStyle={styles.divider}
                    title='Edit profile'
                >
                    <FormLabel>FIRST NAME</FormLabel>
                    <FormInput
                        value={this.state.firstName}
                        onChangeText={text => this.setState({ firstName: text })}
                    />

                    <FormLabel>LAST NAME</FormLabel>
                    <FormInput
                        value={this.state.lastName}
                        onChangeText={text => this.setState({ lastName: text })}
                    />

                    <FormLabel>CONTACT NUMBER</FormLabel>
                    <FormInput
                        value={this.state.contactNum}
                        onChangeText={text => this.setState({ contactNum: text })}
                    />

                    {this.state.reqBeingSent ?
                        <Button
                            loading
                            buttonStyle={lightGreenButton}
                        /> :
                        <Button
                            title='UPDATE'
                            onPress={() => this.updateProfile()}
                            buttonStyle={lightGreenButton}
                        />
                    }
                </Card>
            </View>
        );
    }
}