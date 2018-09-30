import React from 'react';
import {Icon} from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';

import FindARide from '../../screens/FindARide/find-a-ride';
import MyListings from '../../screens/MyListings/my-listings';
import PostARideStack from './post-a-ride-stack';
import Profile from '../../screens/Profile/profile';

export const LoggedInTabs = createBottomTabNavigator ({
    FindARide: { 
        screen: FindARide,
        navigationOptions: () => ({
            tabBarIcon: ({focused, tintColour}) => (
                <Icon name="search" color={focused ? 'limegreen' : tintColour} size={25} />
            )
        })
    },
    PostARide: {
        screen: PostARideStack,
        navigationOptions: () => ({
            tabBarIcon: ({focused, tintColour}) => (
                <Icon name="add" color={focused ? 'limegreen' : tintColour} size={25} />
            )
        })
    },
    MyListings: {
        screen: MyListings,
        navigationOptions: () => ({
            tabBarIcon: ({focused, tintColour}) => (
                <Icon name="folder" color={focused ? 'limegreen' : tintColour} size={25} />
            )
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            tabBarIcon: ({focused, tintColour}) => (
                <Icon name="people" color={focused ? 'limegreen' : tintColour} size={25} />
            )
        })
    },
},
{
    tabBarOptions: {
        activeTintColor: 'limegreen'
      }
});

export default LoggedInTabs