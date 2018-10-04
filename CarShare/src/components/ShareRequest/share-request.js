import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import styles from './share-request-styles';
import { cardNoDivider, cardContainer, lightGreenButton, lightRedButton } from '../../config/commonStyles';
import * as firestoreListings from '../../data/firestore-listings';

export default class ShareRequest extends Component {

    constructor(props) {
        super();

    }

    render() {
        return (
            <View>
                <Card containerStyle={cardContainer}
                    dividerStyle={cardNoDivider}
                >
                    <Text>Name: {this.props.firstName} {this.props.lastName}</Text>
                    <Text>Phone number: {this.props.contactNum}</Text>

                    <Button
                        title="Accept"
                        onPress={() => this.acceptRequest(this.props.index)}
                        buttonStyle={lightGreenButton}
                    /> 

                    <Button
                        title="Reject"
                        onPress={() => this.rejectRequest(this.props.index)}
                        buttonStyle={lightRedButton}
                    /> 
                </Card>
            </View>
        )
    }

    acceptRequest(index) {
      var requester = this.props.listing.whoWantsToCome[index]

      var seatsAvailable = parseInt(this.props.listing.seatsAvailable, 10) - 1;
      this.props.listing.whosComing.push(requester)
      this.props.listing.whoWantsToCome.splice(index, 1)

      firestoreListings.updateListing(this.props.listing, seatsAvailable, (success) => {
        if(success) {
            this.props.listing.navigation.navigate('MyListings')
        }
      });
    }

    rejectRequest(index) {
        this.props.listing.whoWantsToCome.splice(index, 1);
        firestoreListings.updateListing(this.props.listing, (success) => {
          if(success) {
            this.props.listing.navigation.navigate('MyListings')
          }
        });
    }
}