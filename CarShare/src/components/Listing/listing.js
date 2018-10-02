import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

import styles from './listing-styles';
import { cardNoDivider, cardContainer } from '../../config/commonStyles';

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
                </Card>
                <Text>{"\n"}</Text>
            </View>
        )
    }
}