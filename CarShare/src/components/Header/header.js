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
            <View style={styles.headerContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitleTxt}>{this.props.headerTitle}</Text>
                </View>
            </View>
        )
    }
}