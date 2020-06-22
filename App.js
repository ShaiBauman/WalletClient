import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider} from "./src/context/UserContext";
import SettingsScreen from "./src/Screens/SettingsScreen";
import PurchaseScreen from "./src/Screens/PurchaseScreen";
import SignUpScreen from "./src/Screens/SignUpScreen";
import SignInScreen from "./src/Screens/SignInScreen";
import IndexWalletScreen from "./src/Screens/IndexWalletScreen";
import IndexFriendScreen from "./src/Screens/IndexFriendScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import WalletProfileScreen from "./src/Screens/WalletProfileScreen";
import {setNavigator} from "./src/navigationRef";
import AssistanceStatisticsScreen from "./src/Screens/AssistanceStatisticsScreen";



const navigator = createStackNavigator({
        //  loginFlow: {
        Signup: SignUpScreen,
        Signin: SignInScreen,
        Registration: RegistrationScreen,
        Profile: WalletProfileScreen,
        //},
        //walletMainFlow: {
        indexWallet: IndexWalletScreen,
        makePurchase: PurchaseScreen,

        Settings: SettingsScreen,
        //},
        //friendMainFlow: {
        indexFriend: IndexFriendScreen,

        assistanceStatistics:AssistanceStatisticsScreen
        //}
    },
    {
        initialRouteName: "indexFriend",
        defaultNavigationOptions: {
            title: "Wall-let"
        }
    }
);

const App = createAppContainer(navigator);

export default ()=>{
    return(
        <Provider>
            <App ref={(navigator)=>{setNavigator(navigator)}}/>
        </Provider>
    );
};

