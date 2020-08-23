import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native'
import { ListItem } from 'react-native-elements'
import Dashboard from 'react-native-dashboard';
import {Context as UserContext} from "../context/UserContext";
import { NavigationActions } from 'react-navigation';
import MyMenu from "../components/MyMenu";
import {Divider, Menu, Modal, Portal, Provider} from "react-native-paper";
import {FontAwesome} from "@expo/vector-icons";
import SignInScreen from "./SignInScreen";



const DashboardScreen = ({navigation})=>{

    console.disableYellowBox = true;

    const {state} = useContext(UserContext);
    //const [visible,setVisible] = useState( false );

    const card = el => {

        switch(el.name)
        {
            case 'Me':
              return navigation.navigate('indexWallet');

            case 'Make A Purchase':
                return navigation.navigate('makePurchase');

            case 'My Progress':
                return navigation.navigate('statistics');

            case 'Buy!':
                return navigation.navigate('transactions');

            case 'My Friends':
                return navigation.navigate('walletFriends');

            case 'Transactions':
                return navigation.navigate('openReqs');
        }
    };

    const items = [
        { name: 'Me', background: '#CEB386', icon: 'user' },
        { name: 'Make A Purchase', background: '#80B28B', icon: 'shopping-cart' },
        { name: 'My Progress', background: '#D76B49', icon: 'spinner' },
        { name: 'Transactions', background: '#2F4730', icon: 'suitcase' },
        { name: 'My Friends', background: '#80B28B', icon: 'group' },
        { name: 'Buy!', background: '#E9D2B3', icon: 'money' },
    ];
    let ios_list = []
        if (Platform.OS === 'ios') {
            ios_list = items.map(
                (item, i) => (
                    <TouchableOpacity
                        onPress={() => card(item)}
                    >
                        <ListItem
                        key={i}
                        title={item.name}
                        leftIcon={{ name: item.icon }}
                        bottomDivider
                        chevron
                        />
                    </TouchableOpacity>
                )
            )
        }
        else {
            ios_list.push(<Dashboard items={items} background={true} card={card} column={2}/>)
        }

    return(

    <Provider>
    <Portal>
        <View style={styles.container}>
            <MyMenu navigation={navigation}/>
            <Text style={styles.header}>Hello {state.myUser.firstName + ' '+ state.myUser.lastName}</Text>
            <View style={styles.container}>
                {ios_list}
            </View>

        </View>
    </Portal>
</Provider>
    );
};


DashboardScreen.navigationOptions =()=> {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    container: {
        marginTop:15,
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
