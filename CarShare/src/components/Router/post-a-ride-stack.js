import { createStackNavigator } from 'react-navigation';

import AddACar from '../../screens/AddACar/add-a-car';
import PostARide from '../../screens/PostARide/post-a-ride';

const PostARideStack = createStackNavigator ({
    PostARide: {screen: PostARide},
    AddACar: {screen: AddACar}
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

export default PostARideStack
