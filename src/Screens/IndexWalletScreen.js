import React, {useContext, useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, ScrollView} from 'react-native'
import {Text, Input, Avatar} from "react-native-elements";
import {MaterialIcons} from '@expo/vector-icons';
import {Context as UserContext} from "../context/UserContext";
import ImageListForm from "../components/ImageListForm";
import { Dimensions } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Spacer from "../components/Spacer";
import DialogForm from "../components/DialogForm";

const IndexWalletScreen = ()=>{

   const tableData = {
        tableHead: ['Category', 'Description', 'Cost', 'Necessity', 'Approval status'
        ],
            tableData: [
        ['1', '2', '3', '4','5'],
        ['a', 'b', 'c', 'd','e'],
        ['1', '2', '3', '789','10'],
        ['a', 'b', 'c', 'd','s']
    ]
    };

    return(
        <View style={styles.container}>


            <Text style={styles.friendsTitle}>My Friends</Text>
            <View style={styles.friendsContainer}>
               <Avatar
                   xlarge
                    rounded
                    source={require("../../assets/profile-picture-illustration.jpg")}
                   height={70}
                   width={70}
                   overlayContainerStyle={{marginRight:10}}
               />
                <Avatar
                    xlarge
                    rounded
                    source={require("../../assets/profile-picture-illustration.jpg")}
                    height={70}
                    width={70}
                    overlayContainerStyle={{marginRight:10}}
                />
                <Avatar
                xlarge
                rounded
                source={require("../../assets/profile-picture-illustration.jpg")}
                height={70}
                width={70}
                overlayContainerStyle={{marginRight:10}}
            />
            <Avatar
                xlarge
                rounded
                source={require("../../assets/profile-picture-illustration.jpg")}
                large={true}
                height={70}
                width={70}
                overlayContainerStyle={{marginRight:10}}
            />



            </View>
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
        marginBottom:5,

    },
    balanceContainer:{
        marginLeft:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9D2B3',
        borderColor: '#2F4730',
        borderRadius: 12,

    },
    title:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 25,

    },
    context:{
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 20,
        paddingLeft:10,
    },
    buttonContainer: {
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9D2B3',
        height:60,
        width:320,
    },
    content:{
        fontSize: 22
    },
    button: {
        alignItems: "center",
        padding: 3,
        borderColor: '#2F4730',
        borderWidth:3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        textAlign: 'center',
        backgroundColor:'#80B28B',
        marginRight:5,
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',

    },
    chartsContainer:{
        marginLeft:40,
        marginRight:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:2,

    },
    chartsTitle:{ fontWeight: "bold", textAlign: 'center', fontSize: 18, textDecorationLine: 'underline', marginTop: 55},
    containerChart: {
        flex: 1,
        marginRight:5,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    },
    tableTitle:{ fontWeight: "bold", textAlign: 'center', fontSize: 18, textDecorationLine: 'underline'},
    tableContainer: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#E9D2B3' },
    tableHead: { justifyContent: 'center',height: 42, backgroundColor: '#80B28B' },
    tableText: {  fontSize:11, textAlign: 'center' },

    friendsTitle:{ fontWeight: "bold", textAlign: 'center', fontSize: 18, textDecorationLine: 'underline'},
    friendsContainer: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#E9D2B3',flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' },


});



export default IndexWalletScreen;
