import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions: {
                title: 'Geo Dev'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil do GitHub'
            },
        },
    }, {
        defaultNavigationOptions: {
            headerTitleAlign: 'center', /*old headerLayoutPreset*/
            headerTintColor: '#FFFFFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#FC7B6D'
            }
        },
    })
)

export default Routes