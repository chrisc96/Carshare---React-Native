import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from './listing-styles'

export default class Listing extends Component {

    render() {
        return (
            <View>
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
                    <Text>Storage space: {this.props.storageSpace}</Text>
                </View>
                <Text>{"\n"}</Text>
            </View>
        )
    }
}