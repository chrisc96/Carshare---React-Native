import { createStackNavigator } from 'react-navigation';

import LoggedInTabs from './logged-in-tabs';
import LoggedOutStack from './logged-out-stack';

const Router = createStackNavigator ({
    LoggedOutStack: {screen: LoggedOutStack},
    LoggedInTabs: {screen: LoggedInTabs}
},
{
    navigationOptions: {
        header: null
    },
    cardStyle: {
        shadowColor: 'transparent',
        backgroundColor: 'transparent'
    }
});

export default Router
