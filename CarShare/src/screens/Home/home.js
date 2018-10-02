import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements'
import styles from './home-styles';
import { lightGreenButton, lightBlueButton } from '../../config/commonStyles'

export default class Home extends Component {
    static navigationOptions = {
        header: null // Don't show header
    }

    goToFindARide() {
        this.props.navigation.navigate('FindARide', {loggedOut: true});
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
                        <Button
                            title="Find a ride"
                            onPress={() => this.goToFindARide()}
                            buttonStyle={lightBlueButton}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Log in"
                            onPress={() => this.goToLogin()}
                            buttonStyle={lightGreenButton}
                        />
                    </View>
                </View>
            </View>
        );
    }
}