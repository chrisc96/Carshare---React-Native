import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import styles from './listing-styles';
import { cardNoDivider, cardContainer, lightBlueButton } from '../../config/commonStyles';
import * as firestoreListings from '../../data/firestore-listings';

export default class Listing extends Component {

    constructor(props) {
        super();

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
                    {this.props.showReviewRequests ?
                        <Button
                            title='Review requests'
                            onPress={() => this.goToReviewRequestToShare()}
                            buttonStyle={[lightBlueButton]}
                            containerViewStyle={{paddingTop: 10}}
                        /> 
                        : null
                    }
                </Card>
                <Text>{"\n"}</Text>
            </View>
        )
    }

    goToReviewRequestToShare = () => {
        this.props.navigation.navigate('ReviewShareRequests', { listing: this.props })
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
                            buttonStyle={lightBlueButton}
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
        if (!this.props.screenProps.user) {
            // If a user is not logged in, redirect to login
            this.props.navigation.navigate('Login');
        }
        else {
            this.setState({ reqBeingSent: true });

            firestoreListings.addUserToRide(this.props.screenProps.user, this.props.listingID, this.props.whoWantsToCome, (success) => {
                if (success) {
                    this.setState({ reqBeingSent: false })
                }
            });
        }
    }

    userCanRequest() {
        if (!this.props.screenProps.user) return true;
        if (this.props.screenProps.user.uid === this.props.userDocumentID) return false;
        
        let combined = this.props.whosComing.concat(this.props.whoWantsToCome)

        if (this.userNotRequestedOrTaking(combined)) {
            return true;
        }
        return false;
    }

    userNotRequestedOrTaking(combined) {
        let uidLoggedIn = this.props.screenProps.user.email;
        let idx = combined.findIndex(({ email }) => {
            return email === uidLoggedIn;
        })
        return idx === -1;
    }
}