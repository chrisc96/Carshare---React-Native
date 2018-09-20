import { createStackNavigator } from 'react-navigation';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Home from '../screens/home';
import FindARide from '../screens/find-a-ride';
import PostARide from '../screens/post-a-ride';
import MyListings from '../screens/my-listings';

const StackNavigator = createStackNavigator ({
    Home: { screen: Home },
    FindARide: { screen: FindARide },
    PostARide: { screen: PostARide },
    MyListings: { screen: MyListings}
},
{
    navigationOptions: {
        headerStyle: { backgroundColor: '#75AF74', opacity: 1}
    },
    cardStyle: {
        shadowColor: 'transparent',
        backgroundColor: 'transparent'
    }
});

export default class Router extends Component {
    render() {
      return (
          <StackNavigator style={styles.stackNavigator} />
      )
    }
}

const styles = StyleSheet.create({
    stackNavigator: {
        backgroundColor: 'transparent'
    }
});