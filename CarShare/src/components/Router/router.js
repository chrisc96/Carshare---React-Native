import { createStackNavigator } from 'react-navigation';
import React, {Component} from 'react';
import styles from './router-styles'

import Home from '../../screens/Home/home';
import FindARide from '../../screens/FindARide/find-a-ride';
import PostARide from '../../screens/PostARide/post-a-ride';
import MyListings from '../../screens/MyListings/my-listings';

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