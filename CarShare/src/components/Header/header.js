import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './header-styles';

export default class Header extends Component {

    constructor(props) {
        super();
        this.headerTitle = props.headerTitle;
    }

    render() {
        return (
            <View style={{ paddingTop: 15, paddingBottom: 15, backgroundColor: '#75AF74', elevation: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: 'white', paddingLeft: 16, fontSize: 20 }}>{this.props.headerTitle}</Text>
                </View>
            </View>
        )
    }
}