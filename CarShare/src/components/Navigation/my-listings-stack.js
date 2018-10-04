import { createStackNavigator } from 'react-navigation';

import MyListings from '../../screens/my-listings';
import RideListing from '../../screens/ride-listing';
import ReviewShareRequest from '../../screens/review-share-request';

const MyListingsStack = createStackNavigator ({
    MyListings: {screen: MyListings},
    RideListing: {screen: RideListing},
    ReviewShareRequest: {screen:ReviewShareRequest}
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
