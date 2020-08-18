import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider as UserProvider} from "./src/context/UserContext";
import {Provider as RequestContext} from "./src/context/requestContext";
import {Provider as FinancialProvider} from "./src/context/FinancialContext";
import SettingsScreen from "./src/Screens/SettingsScreen";
import PurchaseScreen from "./src/Screens/PurchaseScreen";
import SignInScreen from "./src/Screens/SignInScreen";
import IndexWalletScreen from "./src/Screens/IndexWalletScreen";
import IndexFriendScreen from "./src/Screens/IndexFriendScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import WalletProfileScreen from "./src/Screens/WalletProfileScreen";
import {setNavigator} from "./src/navigationRef";
import AddCreditCard from "./src/Screens/AddCreditCard";
import DashbordScreen from "./src/Screens/DashbordScreen";
import StatisticsScreen from "./src/Screens/StatisticsScreen";
import TransactionScreen from "./src/Screens/TransactionsScreen";
import FriendsScreen from "./src/Screens/FriendsScreen";
import AssistanceStatisticsScreen from "./src/Screens/AssistanceStatisticsScreen";
import PasswordRecoveryScreen from "./src/Screens/PasswordRecoveryScreen";


const navigator = createStackNavigator({
    //  loginFlow: {
        Signin: SignInScreen,
        PasswordRecovery: PasswordRecoveryScreen,
        Registration: RegistrationScreen,
        Profile: WalletProfileScreen,
      //},
      //walletMainFlow: {
        indexWallet: IndexWalletScreen,
        makePurchase: PurchaseScreen,
        addCreditCard: AddCreditCard,
        Settings: SettingsScreen,
      //},
      //friendMainFlow: {
        indexFriend: IndexFriendScreen,
        dashboard: DashboardScreen,
       assistanceStatistics:AssistanceStatisticsScreen,
     statistics: StatisticsScreen,
    transactions: TransactionScreen,
    walletFriends: FriendsScreen
      //}
    },
    {
        initialRouteName: "Signin",
        defaultNavigationOptions: {
            title: "WLT"
        }
    }
);

const App = createAppContainer(navigator);

export default ()=>{
  return(
<RequestContext>
      <UserProvider>
          <FinancialProvider>
            <App ref={(navigator)=>{setNavigator(navigator)}}/>
          </FinancialProvider>
      </UserProvider>
</RequestContext>
  );
};

