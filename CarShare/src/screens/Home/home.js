import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from './home-styles';

export default class Home extends Component {
    static navigationOptions = {
        header: null // Don't show header
    }

    goToFindARide() {
        this.props.navigation.navigate('FindARide');
    }

    goToLogin() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.home}>
                <Image style={styles.logoImg} source={require('../../assets/imgs/carLogo.png')} />

                <Text style={styles.title}>CarShare</Text>
                <Text style={styles.subTitle}>one stop car pool shop</Text>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Find a ride" color='limegreen' onPress={() => this.goToFindARide()} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Log in" color='dodgerblue' onPress={() => this.goToLogin()} />
                    </View>
                </View>
            </View>
        );
    }
}