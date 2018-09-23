import React, {Component} from '../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import { View, Text } from 'react-native';
import styles from './listing-styles'

export default class Listing extends Component {

    render() {
        var storageSpaceString = this.props.storageSpace ? 'yes' : 'no';

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
                    <Text>Storage space: {storageSpaceString}</Text>
                </View>
                <Text>{"\n"}</Text>
            </View>
        )
    }
}