import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from './home-styles'

export default class Home extends Component {

    static navigationOptions = {
        header: null // Don't show header
    }

    goToFindARide() {
        this.props.navigation.navigate('FindARide');
    }

    goToPostARide() {
        this.props.navigation.navigate('PostARide');
    }

    goToMyListings() {
        this.props.navigation.navigate('MyListings');
    }

    render() {
        return (
            <View style={styles.home}>
                <Image style={styles.logoImg} source={require('../../assets/carLogo.png')} />

                <Text style={styles.title}>CarShare</Text>
                <Text style={styles.subTitle}>Where you come to carpool</Text>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Find a ride" color='limegreen' onPress={() => this.goToFindARide()} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Post a ride" color='red' onPress={() => this.goToPostARide()} />
                    </View>
                    <View style={styles.button}>
                        <Button title="View my listings" color='dodgerblue' onPress={() => this.goToMyListings()} />
                    </View>
                </View>
            </View>
        );
    }
}