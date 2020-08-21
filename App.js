import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider as UserProvider} from "./src/context/UserContext";
import {Provider as RequestProvider} from "./src/context/requestContext";
import {Provider as CategoryProvider} from "./src/context/CategoryContext";
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
import DashbordScreen from "./src/Screens/DashbordScreen";
import StatisticsScreen from "./src/Screens/StatisticsScreen";
import TransactionScreen from "./src/Screens/TransactionsScreen";
import FriendsScreen from "./src/Screens/FriendsScreen";
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
        chooseCreditCard: ChooseCreditCard,
        addCreditCard: AddCreditCard,
        Settings: SettingsScreen,
      //},
      //friendMainFlow: {
        indexFriend: IndexFriendScreen,
       assistanceStatistics:AssistanceStatisticsScreen,
       dashbord: DashbordScreen,
        statistics: StatisticsScreen,
    transactions: TransactionScreen,
    walletFriends: FriendsScreen
      //}
    },
    {
        initialRouteName: "makePurchase",
        defaultNavigationOptions: {
            title: "WLT"
        }
    }
);

const App = createAppContainer(navigator);

export default ()=>{
  return(
      <RequestProvider>
      <CategoryProvider>
          <UserProvider>
              <App ref={(navigator)=>{setNavigator(navigator)}}/>
          </UserProvider>
      </CategoryProvider>
      </RequestProvider>

  );
};

