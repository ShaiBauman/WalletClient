import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native'
import {Text, Button, Input} from "react-native-elements";
import {MaterialIcons} from '@expo/vector-icons';
import {Context as UserContext} from "../context/UserContext";

const IndexWalletScreen = ()=>{
    const {state:
        {firstName,lastName,target,myWalletMembers, myFixedExpenses, myFixedIncomes, avgExpenses,passes}} = useContext(UserContext);
    return(
        <View style={styles.container}>
            <MaterialIcons name="settings" size={30}/>
            <Text h3>Index Wallet Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin:10,
        backgroundColor:'#80B28B',
        borderColor:'#80B28B'
    }
});

export default IndexWalletScreen;
