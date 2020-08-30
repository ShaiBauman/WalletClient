import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider as UserProvider} from "./src/context/UserContext";
import {Provider as StatProvider} from "./src/context/StatisticsContext";
import {Provider as RequestProvider} from "./src/context/requestContext";
import {Provider as CategoryProvider} from "./src/context/CategoryContext";
import {Provider as FinancialProvider} from "./src/context/FinancialContext";
import { Provider as BotContext} from './src/context/BotContext';
import SettingsScreen from "./src/Screens/SettingsScreen";
import PurchaseScreen from "./src/Screens/PurchaseScreen";
import SignInScreen from "./src/Screens/SignInScreen";
import IndexWalletScreen from "./src/Screens/IndexWalletScreen";
import IndexFriendScreen from "./src/Screens/IndexFriendScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import WalletProfileScreen from "./src/Screens/WalletProfileScreen";
import {setNavigator} from "./src/navigationRef";
import AddCreditCard from "./src/Screens/AddCreditCard";
import DashboardScreen from "./src/Screens/DashboardScreen";
import StatisticsScreen from "./src/Screens/StatisticsScreen";
import TransactionScreen from "./src/Screens/TransactionsScreen";
import FriendsScreen from "./src/Screens/FriendsScreen";
import AssistanceStatisticsScreen from "./src/Screens/AssistanceStatisticsScreen";
import PasswordRecoveryScreen from "./src/Screens/PasswordRecoveryScreen";
import BotGenerator from "./src/Screens/BotGenerator";
import OpenRequests from "./src/Screens/OpenRequests";
import FullRequest from "./src/Screens/FullRequest";


const navigator = createStackNavigator({
        //  loginFlow: {
        SignIn: SignInScreen,
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
        assistanceStatistics: AssistanceStatisticsScreen,
        statistics: StatisticsScreen,
        transactions: TransactionScreen,
        walletFriends: FriendsScreen,
        //}
        Generator: BotGenerator,
        openReqs: OpenRequests,
        FullR: FullRequest
    },
    {
        initialRouteName: 'SignIn',
        defaultNavigationOptions: {
            title: 'Wall-Let App',
        },
    }
);

const App = createAppContainer(navigator);

export default ()=>{
  return(
      <StatProvider>
          <BotContext>
                <RequestProvider>
                    <CategoryProvider>
                      <UserProvider>
                          <FinancialProvider>
                            <App ref={(navigator)=>{setNavigator(navigator)}}/>
                          </FinancialProvider>
                      </UserProvider>
                    </CategoryProvider>
                </RequestProvider>
          </BotContext>
      </StatProvider>
  );
};

