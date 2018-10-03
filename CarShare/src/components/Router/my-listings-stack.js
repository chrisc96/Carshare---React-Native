import { createStackNavigator } from 'react-navigation';

import MyListings from '../../screens/MyListings/my-listings';
import RideListing from '../../screens/RideListing/ride-listing';

const MyListingsStack = createStackNavigator ({
    MyListings: {screen: MyListings},
    RideListing: {screen: RideListing}
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

export default MyListingsStack
