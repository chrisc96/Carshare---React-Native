import { createStackNavigator } from 'react-navigation';

import RidesImTaking from '../../screens/rides-im-taking';
import RideListing from '../../screens/ride-listing';

const RidesTakingStack = createStackNavigator ({
    RidesImTaking: {screen: RidesImTaking},
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

export default RidesTakingStack
