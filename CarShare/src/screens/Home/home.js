import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from './home-styles';
import firebase from 'react-native-firebase';

export default class Home extends Component {
  goToFindARide() {
    this.props.navigation.navigate('FindARide');
  }
  
  goToPostARide() {
    if(firebase.auth().currentUser) {
        this.props.navigation.navigate('PostARide');
    } else {
        this.props.navigation.navigate('Login', { toPage: 'PostARide'})
    }
  }
  
  goToMyListings() {
    if(firebase.auth().currentUser) {
        this.props.navigation.navigate('MyListings');
    } else {
        this.props.navigation.navigate('Login', { toPage: 'MyListings'})
    }
  }

  render() {
    return (
        <View style={styles.home}>
            <Image source={require('../../assets/carLogo.png')}/>
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