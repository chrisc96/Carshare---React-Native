import { createStackNavigator } from 'react-navigation';

import Home from '../../screens/Home/home';
import Login from '../../screens/Login/login';
import SignUp from '../../screens/SignUp/sign-up';
import FindARide from '../../screens/FindARide/find-a-ride';
import RideListing from '../../screens/RideListing/ride-listing'

const LoggedOutStack = createStackNavigator({
    Home: { screen: Home },
    FindARide: { screen: FindARide },
    RideListing: { screen: RideListing },
    Login: { screen: Login },
    SignUp: { screen: SignUp }
},
    {
        navigationOptions: {
            headerStyle: { backgroundColor: '#75AF74', opacity: 1 }
        },
        cardStyle: {
            shadowColor: 'transparent',
            backgroundColor: 'transparent'
        }
    });

export default LoggedOutStack