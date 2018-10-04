import { createStackNavigator } from 'react-navigation';

import FindARide from '../../screens/find-a-ride';
import RideListing from '../../screens/ride-listing';

const FindARideStack = createStackNavigator ({
    FindARide: {screen: FindARide},
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

export default FindARideStack
