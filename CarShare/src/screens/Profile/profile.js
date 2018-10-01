import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'react-native-firebase';

export default class Home extends Component {
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

    render() {
        return (
            <View>
                <View>
                    <Text>First Name: {this.state.firstName}</Text>
                </View>
                <View>
                    <Text>Last Name: {this.state.lastName}</Text>
                </View>
                <View>
                    <Text>Contact Number: {this.state.contactNum}</Text>
                </View>
                <Button title="Logout" color='limegreen' onPress={() => this.logout()} />
            </View>
        );
    }
}