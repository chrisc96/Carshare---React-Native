import { createStackNavigator } from 'react-navigation';
import React, {Component} from 'react';
import styles from './router-styles'

import Home from '../../screens/Home/home';
import FindARide from '../../screens/FindARide/find-a-ride';
import PostARide from '../../screens/PostARide/post-a-ride';
import MyListings from '../../screens/MyListings/my-listings';
import Login from '../../screens/Login/login';
import SignUp from '../../screens/SignUp/sign-up';
import AddACar from '../../screens/AddACar/add-a-car';

const StackNavigator = createStackNavigator ({
    Home: { screen: Home },
    FindARide: { screen: FindARide },
    PostARide: { screen: PostARide },
    MyListings: { screen: MyListings},
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    AddACar: { screen: AddACar }
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