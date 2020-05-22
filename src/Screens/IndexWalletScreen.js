import React, {useContext, useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, ScrollView} from 'react-native'
import {Text, Input} from "react-native-elements";
import {MaterialIcons} from '@expo/vector-icons';
import {Context as UserContext} from "../context/UserContext";
import ImageListForm from "../components/ImageListForm";
import PieChartForm from "../components/PieChartForm";
import StackedBarChartForm from "../components/StackedBarChartForm";

const IndexWalletScreen = ()=>{
    const {state:
        {firstName,lastName,target,myWalletMembers, myFixedExpenses, myFixedIncomes, avgExpenses,passes}, getImageById} = useContext(UserContext);


    const func1 = ()=>{

    };
    const func2 = ()=>{

    };    const func3 = ()=>{

    };


    const buttonList = [
        {title: "Add One Time Income", func: func1},
        {title: "My Expenses", func: func2},
        {title: "Make A Purchase", func: func3}
    ];
    const dataPie = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

    const keys = ['apples', 'bananas', 'cherries', 'dates']

    const dataStackedBar = [
        {
            month: new Date(2015, 0, 1),
            apples: 3840,
            bananas: 1920,
            cherries: 960,
            dates: 400,
            oranges: 400,
        },
        {
            month: new Date(2015, 1, 1),
            apples: 1600,
            bananas: 1440,
            cherries: 960,
            dates: 400,
        },
        {
            month: new Date(2015, 2, 1),
            apples: 640,
            bananas: 960,
            cherries: 3640,
            dates: 400,
        },
        {
            month: new Date(2015, 3, 1),
            apples: 3320,
            bananas: 480,
            cherries: 640,
            dates: 400,
        },
    ]



    return(
        <View style={styles.container}>
            <MaterialIcons name="settings" size={30}/>
            <Text style={styles.header}>Hello {firstName} {lastName},</Text>
            <Text style={styles.title}>Monthly Balance</Text>
            <Text  style={styles.context}>{avgExpenses}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={func1}
                >
                    <Text style={styles.button}>{"Make A Purchase"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={func2}
                >
                    <Text style={styles.button}>{"My Expenses"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={func2}
                >
                    <Text style={styles.button}>{"Add One Time Income"}</Text>
                </TouchableOpacity>

            </View>



            <ImageListForm
                userList={myWalletMembers}
                getImageById={getImageById}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin:5,
        backgroundColor:'#E9D2B3',
        borderColor:'#E9D2B3',
    },
    header:{
        color: "#D76B49",
        textAlign: 'center',
        fontSize:40,
        textShadowRadius: 20,
        fontWeight: "bold",
        marginBottom:20,

    },
    title:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 25,
        marginBottom:10
    },
    context:{
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 20
    },
    buttonContainer: {
        flex: 1,
        marginLeft:20,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CEB386'
    },
    content:{
        fontSize: 22
    },
    button: {
        alignItems: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth:3,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        paddingLeft:18,
        backgroundColor:'#80B28B',
        marginRight:12,
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',

    },
    graphContainer:{
        flex: 1,
        marginLeft:10,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }

});

export default IndexWalletScreen;
