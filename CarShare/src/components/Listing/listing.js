import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from './listing-styles'

export default class Listing extends Component {

    constructor(props) {
        super();
        this.userDetails = null;

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
        var storageSpaceString = this.props.storageSpace ? 'yes' : 'no'; 

        return (
            <View>
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
                    <Text>Storage space: {storageSpaceString}</Text>
                </View>
                <Text>{"\n"}</Text>
            </View>
        )
    }
}