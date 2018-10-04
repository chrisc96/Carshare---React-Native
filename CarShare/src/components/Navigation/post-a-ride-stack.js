import { createStackNavigator } from 'react-navigation';

import AddACar from '../../screens/add-a-car';
import PostARide from '../../screens/post-a-ride';

const PostARideStack = createStackNavigator ({
    PostARide: {screen: PostARide},
    AddACar: {screen: AddACar}
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

export default PostARideStack
