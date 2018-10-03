import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import styles from './listing-styles';
import { cardNoDivider, cardContainer, lightBlueButton } from '../../config/commonStyles';
import firebase from 'react-native-firebase';

export default class Listing extends Component {

    constructor(props) {
        super();

        console.log('test', props)

        this.userDetails = null;
        this.storageSpaceString = props.storageSpace ? 'yes' : 'no';

        if (props.firstName) {
            this.userDetails = (
                <View>
                    <Text>Listed by: {props.firstName} {props.lastName}</Text>
                    <Text>Contact number: {props.contactNum}</Text>
                </View>
            )
        }

        this.state = ({
            reqBeingSent: false
        })
    }

    render() {
        return (
            <View>
                <Card containerStyle={cardContainer}
                    dividerStyle={cardNoDivider}
                >
                    {this.userDetails}
                    <View>
                        <Text>Vehicle: {this.props.make} {this.props.model} ({this.props.year})</Text>
                    </View>
                    <View>
                        <Text>Departs: {this.props.departureDate} {this.props.departureTime}</Text>
                    </View>
                    <View>
                        <Text>Destination: {this.props.destination}</Text>
                    </View>
                    <View>
                        <Text>Meeting point: {this.props.meetingPoint}</Text>
                    </View>
                    <View>
                        <Text>Seats available: {this.props.seatsAvailable}</Text>
                    </View>
                    <View>
                        <Text>Storage space: {this.storageSpaceString}</Text>
                    </View>

                    {this.props.showRequestToShare ? this.showCorrectButton() : null}
                </Card>
                <Text>{"\n"}</Text>
            </View>
        )
    }

    showCorrectButton = () => {
        if (this.userCanRequest()) {
            return (
                <View>
                    {this.state.reqBeingSent ?
                        <Button
                            loading
                            buttonStyle={lightBlueButton}
                            containerViewStyle={{paddingTop: 10}}
                        /> :
                        <Button
                            title='Request To Share'
                            onPress={() => this.requestToSharePressed()}
                            buttonStyle={[lightBlueButton]}
                            containerViewStyle={{paddingTop: 10}}
                        />
                    }
                </View>
            )
        }
        else {
            return <Button
                title='Request To Share'
                containerViewStyle={{paddingTop: 10}}
            />
        }
    }

    requestToSharePressed = () => {
        if (!firebase.auth().currentUser) {
            // If a user is not logged in, redirect to login
            this.props.navigation.navigate('Login');
        }
        else {
            this.setState({ reqBeingSent: true });

            firebase.firestore().doc('users/' + firebase.auth().currentUser.uid).onSnapshot(userInfo => {
                let user = {
                    contactNum: userInfo._data.contactNum,
                    firstName: userInfo._data.firstName,
                    lastName: userInfo._data.lastName,
                    email: firebase.auth().currentUser.email,
                    uid: firebase.auth().currentUser.uid
                }

                this.props.whoWantsToCome.push(user);
                firebase.firestore().collection('listings').doc(this.props.listingID).update({
                    whoWantsToCome: this.props.whoWantsToCome
                })
                    .then((response) => {
                        this.setState({ reqBeingSent: false })
                    })
            })
        }
    }

    userCanRequest() {
        if (!firebase.auth().currentUser) return true;
        if (firebase.auth().currentUser.uid === this.props.userDocumentID) return false;

        let combined = this.props.whosComing.concat(this.props.whoWantsToCome)

        if (this.userNotRequestedOrTaking(combined)) {
            return true;
        }
        return false;
    }

    userNotRequestedOrTaking(combined) {
        let uidLoggedIn = firebase.auth().currentUser.email;
        let idx = combined.findIndex(({ email }) => {
            return email === uidLoggedIn;
        })
        return idx === -1;
    }
}