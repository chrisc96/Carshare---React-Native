import { createStackNavigator } from 'react-navigation';

import Profile from '../../screens/profile';
import EditProfile from '../../screens/edit-profile';

const ProfileStack = createStackNavigator({
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile }
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

export default ProfileStack
