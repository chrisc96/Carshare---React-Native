import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';

import styles from './profile-styles';
import { lightGreenButton } from '../../config/commonStyles';
import * as auth from '../../data/auth';
import * as firestoreUsers from '../../data/firestore-users';

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            contactNum: ''
        }
    }

    componentDidMount() {
        firestoreUsers.getUser(this.props.screenProps.user.uid, (listing) => {
            this.setState({
                firstName: listing.firstName,
                lastName: listing.lastName,
                contactNum: listing.contactNum
            })
        });
    }

    logout() {
        auth.logOut()
            .then(res => {
                // prevent back button from appearing
                this.props.navigation.dispatch(
                    StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'LoggedOutStack' })]
                    })
                )
            });
    }

    goToEditProfile() {
        this.props.navigation.navigate('EditProfile');
    }

    render() {
        return (
            <View style={styles.details}>
                <Card
                    containerStyle={styles.profileCard}
                    titleStyle={styles.profileTitle}
                    dividerStyle={styles.divider}
                    title='Profile'
                >
                    <View style={styles.edit}>
                        <Icon name="edit" onPress={() => this.goToEditProfile()} />
                    </View>
                    <View style={styles.detail}>
                        <Text>First Name: {this.state.firstName}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text>Last Name: {this.state.lastName}</Text>
                    </View>
                    <View style={[styles.detail, styles.lastItem]}>
                        <Text>Contact Number: {this.state.contactNum}</Text>
                    </View>

                    <Button
                        buttonStyle={lightGreenButton}
                        title="Logout"
                        onPress={() => this.logout()}
                    />
                </Card>
            </View>
        );
    }
}