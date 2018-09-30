import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Home extends Component {
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
                <Button title="Logout" color='limegreen' onPress={() => this.logout()} />
            </View>
        );
    }
}