import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';

export default class Home extends Component {
  render() {
    return (
        <View style={styles.home}>
            <Image source={require('../assets/carLogo.png')}/>
            <Text style={styles.title}>CarShare</Text>
            <Text style={styles.subTitle}>Find and Share your rides!</Text>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Find a ride" color='limegreen'/>
                </View>
                <View style={styles.button}>
                    <Button title="Post a ride" color='red'/>
                </View>
                <View style={styles.button}>
                    <Button title="View my listings" color='dodgerblue'/>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'cursive',
        fontSize: 40,
        color: '#FFFAE5'
    },
    subTitle: {
        color: '#FFFAE5'
    },
    buttons: {
        width: '70%',
        marginTop: 30
    },
    button: {
        paddingVertical: 8
    }
});
