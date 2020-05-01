import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SettingsScreen from "./src/Screens/SettingsScreen";
import PurchaseScreen from "./src/Screens/PurchaseScreen";
import SignUpScreen from "./src/Screens/SignUpScreen";
import SignInScreen from "./src/Screens/SignInScreen";
import IndexWelletScreen from "./src/Screens/IndexWelletScreen";
import IndexFriendScreen from "./src/Screens/IndexFriendScreen";


const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignUpScreen,
    Signin: SignInScreen
  }),
  welletMainFlow: createStackNavigator({
    indexWellet: IndexWelletScreen,
    makePurchase: PurchaseScreen,
    Settings: SettingsScreen,
  }),
  friendMainFlow: createStackNavigator({
    indexFriend: IndexFriendScreen,
    Settings: SettingsScreen,
  })
});

const App = createAppContainer(switchNavigator);

export default ()=>{
  return(
      <AuthProvider>
        <App/>
      </AuthProvider>
  );
};


