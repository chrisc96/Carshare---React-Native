import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { EditProfileHeaderTitle } from './../../config/constants'
import { headerTextColour, normalFontWeight } from '../../config/global-styles'
import firebase from 'react-native-firebase';

import styles from './edit-profile-styles';

export default class EditProfile extends Component {

    static navigationOptions = {
        title: EditProfileHeaderTitle,
        headerTintColor: headerTextColour,
        headerTitleStyle: {
          fontWeight: normalFontWeight,
        }
      }

    constructor() {
        super();
        this.userID = firebase.auth().currentUser.uid;
        this.firestoreUser = firebase.firestore().doc('users/' + this.userID);

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
        this.firestoreUser.onSnapshot((userDocument) => {
            const { firstName, lastName, contactNum } = userDocument.data();

            this.setState({
                firstName: firstName,
                lastName: lastName,
                contactNum: contactNum,
                originalFirstName: firstName,
                originalLastName: lastName,
                originalContactNum: contactNum
            });
        });
    }

    goToProfile() {
        this.props.navigation.navigate('Profile');
    }

    updateProfile() {
        this.setState({reqBeingSent: true});

        this.firestoreUser.update({
          firstName: this.state.firstName ? this.state.firstName : this.state.originalFirstName,
          lastName: this.state.lastName ? this.state.lastName : this.state.originalLastName,
          contactNum: this.state.contactNum ? this.state.contactNum : this.state.originalContactNum
        })
          .then((response) => {
            this.setState({ reqBeingSent: false })
            this.goToProfile();
          })
          .catch((error) => {
            this.setState({ reqBeingSent: false })
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
                        buttonStyle={styles.updateBtn}
                      /> :
                      <Button 
                        title='UPDATE'
                        onPress={() => this.updateProfile()}
                        buttonStyle={styles.updateBtn}
                      />
                    }
                </Card>
            </View>
        );
    }
}