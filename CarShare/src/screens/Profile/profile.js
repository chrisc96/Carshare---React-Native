import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'react-native-firebase';

import styles from './profile-styles';

export default class Profile extends Component {
    constructor() {
        super();
        this.userID = firebase.auth().currentUser.uid;
        this.firestoreUser = firebase.firestore().doc('users/' + this.userID);

        this.state = {
            firstName: '',
            lastName: '',
            contactNum: ''
        }
    }

    componentDidMount() {
        this.firestoreUser.onSnapshot(this.onDocumentUpdate)
    }
    
    onDocumentUpdate = (userDocument) => {
        const { firstName, lastName, contactNum } = userDocument.data();

        this.setState({
            firstName: firstName,
            lastName: lastName,
            contactNum: contactNum
        });
    }

    logout() {
        firebase.auth().signOut();
        // prevent back button from appearing
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                key: null,
                actions:[NavigationActions.navigate({routeName: 'LoggedOutStack'})]
            })
        )
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
                        <Icon name="edit" onPress={() => this.goToEditProfile()}/>
                    </View>
                    <View style={styles.detail}>
                        <Text>First Name: {this.state.firstName}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text>Last Name: {this.state.lastName}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text>Contact Number: {this.state.contactNum}</Text>
                    </View>

                    <Button style={styles.btn} title="Logout" color='limegreen' onPress={() => this.logout()} />
                </Card>
            </View>
        );
    }
}