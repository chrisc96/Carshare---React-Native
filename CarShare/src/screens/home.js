import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';

export default class Home extends Component {
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
            <Image source={require('../assets/carLogo.png')}/>
            <Text style={styles.title}>CarShare</Text>
            <Text style={styles.subTitle}>Find and Share your rides!</Text>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Find a ride" color='limegreen' onPress={() => this.goToFindARide()}/>
                </View>
                <View style={styles.button}>
                    <Button title="Post a ride" color='red' onPress={() => this.goToPostARide()}/>
                </View>
                <View style={styles.button}>
                    <Button title="View my listings" color='dodgerblue' onPress={() => this.goToMyListings()}/>
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
        fontFamily: 'monospace',
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
