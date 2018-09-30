import { createStackNavigator } from 'react-navigation';

import TabStack from './tab-stack';
import LoggedOutStack from './logged-out-stack';

const Router = createStackNavigator ({
    LoggedOutStack: {screen: LoggedOutStack},
    TabStack: {screen: TabStack}
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
