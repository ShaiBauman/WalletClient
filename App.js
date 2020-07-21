import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider as UserProvider} from "./src/context/UserContext";
import SettingsScreen from "./src/Screens/SettingsScreen";
import PurchaseScreen from "./src/Screens/PurchaseScreen";
import SignUpScreen from "./src/Screens/SignUpScreen";
import SignInScreen from "./src/Screens/SignInScreen";
import IndexWalletScreen from "./src/Screens/IndexWalletScreen";
import IndexFriendScreen from "./src/Screens/IndexFriendScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import WalletProfileScreen from "./src/Screens/WalletProfileScreen";
import {setNavigator} from "./src/navigationRef";
import AddCreditCard from "./src/Screens/AddCreditCard";
import ChooseCreditCard from "./src/Screens/ChooseCreditCard";
import DashboardScreen from "./src/Screens/DashboardScreen";
import StatisticsScreen from "./src/Screens/StatisticsScreen";
import TransactionScreen from "./src/Screens/TransactionsScreen";
import FriendsScreen from "./src/Screens/FriendsScreen";


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
        chooseCreditCard: ChooseCreditCard,
        addCreditCard: AddCreditCard,
        Settings: SettingsScreen,
      //},
      //friendMainFlow: {
        indexFriend: IndexFriendScreen,
        dashboard: DashboardScreen,
        statistics: StatisticsScreen,
    transactions: TransactionScreen,
    walletFriends: FriendsScreen
      //}
    },
    {
        initialRouteName: "dashboard",
        defaultNavigationOptions: {
            title: "WLT"
        }
    }
);

const App = createAppContainer(navigator);

export default ()=>{
  return(

      <UserProvider>
          <App ref={(navigator)=>{setNavigator(navigator)}}/>
      </UserProvider>

  );
};

