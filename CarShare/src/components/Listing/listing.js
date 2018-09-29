import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from './listing-styles'

export default class Listing extends Component {

    render() {
        var storageSpaceString = this.props.storageSpace ? 'yes' : 'no';

        return (
            <View>
                <View>
                    <Text>Listed by: {this.props.firstName} {this.props.lastName}</Text>
                    <Text>Contact number: {this.props.contactNum}</Text>
                </View>
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
                    <Text>Storage space: {storageSpaceString}</Text>
                </View>
                <Text>{"\n"}</Text>
            </View>
        )
    }
}