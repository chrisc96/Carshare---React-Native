import { createBottomTabNavigator } from 'react-navigation';

import FindARide from '../../screens/FindARide/find-a-ride';
import MyListings from '../../screens/MyListings/my-listings';
import PostARideStack from './post-a-ride-stack';
import Profile from '../../screens/Profile/profile';

export const TabStack = createBottomTabNavigator ({
    FindARide: { screen: FindARide },
    PostARide: { screen: PostARideStack },
    MyListings: { screen: MyListings},
    Profile: { screen: Profile }
});

export default TabStack