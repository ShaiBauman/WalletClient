import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Dashboard from 'react-native-dashboard';
import {Context as UserContext} from "../context/UserContext";
import { NavigationActions } from 'react-navigation';
import MyMenu from "../components/MyMenu";
import {Divider, Menu, Modal, Portal, Provider} from "react-native-paper";
import {FontAwesome} from "@expo/vector-icons";



const DashboardScreen = ({navigation})=>{

    const {state: {firstName,lastName}} = useContext(UserContext);
    const [visible,setVisible] = useState( false );


    const card = el => {
        console.log('Card: ' + el.name)

        switch(el.name)
        {
            case 'Me':
              return navigation.navigate('indexWallet');

            case 'Make A Purchase':
                return navigation.navigate('makePurchase');

            case 'My Progress':
                return navigation.navigate('statistics');

            case 'One-time Income':
                return navigation.navigate('indexWallet');

            case 'My Friends':
                return navigation.navigate('walletFriends');

            case 'Transactions':
                return navigation.navigate('transactions');
        }
    };

    const items = [
        { name: 'Me', background: '#CEB386', icon: 'user' },
        { name: 'Make A Purchase', background: '#80B28B', icon: 'shopping-cart' },
        { name: 'My Progress', background: '#D76B49', icon: 'spinner' },
        { name: 'One-time Income', background: '#2F4730', icon: 'money' },
        { name: 'My Friends', background: '#80B28B', icon: 'group' },
        { name: 'Transactions', background: '#E9D2B3', icon: 'suitcase' },
    ];



    return(
    <Provider>
    <Portal>
        <View style={styles.container}>

            <MyMenu/>

            <Text style={styles.header}>Hello {firstName} {lastName},</Text>
        <View style={styles.container}>
            <Dashboard items={items} background={true} card={card} column={2} />
        </View>

        </View>
    </Portal>
</Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },

            header:{
            color: "#D76B49",
            textAlign: 'center',
            fontSize:40,
            textShadowRadius: 20,
            fontWeight: "bold",
            marginBottom:5,

        }
});
export default DashboardScreen;
