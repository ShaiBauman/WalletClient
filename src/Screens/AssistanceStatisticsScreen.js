import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native'
import {Text} from "react-native-elements";
import {Context as StatisticsContext} from '../context/StatisticsContext'
import {Context as UserContext} from '../context/UserContext'
import { Dimensions } from "react-native";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { data } from "react-native-chart-kit/data";
import DropDownForm from "../components/DropDownForm";

const AssistanceStatisticsScreen = ()=>{

    const user_state = useContext(UserContext).state
    const {state, myWalletMembers, infoAboutFriend} = useContext(StatisticsContext)
    let friend_list = []

    const [friend,setFriend]=useState(friend_list);
    useEffect(() => {
        myWalletMembers(user_state.myUser.email)
    }, [])

    if (typeof state.myWalletMembers !== 'undefined' && JSON.stringify(friend) === "[]") {
        for (let email of state.myWalletMembers) {
            friend_list.push({value: email})
        }

        setFriend(friend_list)
    }

    let chart = []

    const chartConfig = {
        backgroundGradientFrom: "#2F4730",
        backgroundGradientFromOpacity: 5,
        backgroundGradientTo: "#2F4730",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(40, 85, 60, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional

    };

    if(typeof state.infoAboutFriend !== 'undefined') {
        console.log("state.infoAboutFriend"+ JSON.stringify(state.infoAboutFriend))
        const paiData = [
            {
                key: state.infoAboutFriend["Approved"],
                name: "Approved",
                population: state.infoAboutFriend["Approved"],
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#2F4730",
                legendFontSize: 15
            },
            {
                key: state.infoAboutFriend["Denied"],
                name: "Denied",
                population: state.infoAboutFriend["Denied"],
                color: "rgb(200, 110, 120)",
                legendFontColor: "#2F4730",
                legendFontSize: 15
            },
            {
                key: state.infoAboutFriend["DidntResponse"],
                name: "Didn't Response",
                population: state.infoAboutFriend["DidntResponse"],
                color: "rgb(170, 227, 90)",
                legendFontColor: "#2F4730",
                legendFontSize: 15
            }
        ];

        chart.push(
            <PieChart
                data={paiData}
                width={320}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute={true}
                bgColor={"transparent"}
            />
        )
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.header}>My Statistics</Text>

            <View style={styles.chartsContainer}>
                <ScrollView>
                    <DropDownForm
                        data={friend}
                        title={"Choose A Friend"}
                        onSubmit={(friend) => {
                            console.log(friend+" friend")
                                infoAboutFriend(user_state.myUser.email,friend)
                        }
                        }
                    />
                    <Text style={styles.chartsTitle}>Balance requests</Text>
    <View style={{backgroundColor: "rgb(109, 153, 118)"}}>
                    {chart}
    </View>
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor:'#E9D2B3',
    },
    header:{
        color: "#D76B49",
        textAlign: 'center',
        textShadowRadius:10,
        fontSize:40,
        fontWeight: "bold",
        margin:20,
        textShadowColor:'#FFF'

    },

    chartsContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        flex:1,

    },

    chartsTitle:{
        fontWeight: "bold",
        textAlign: 'center',
        color:"#2F4730",
        fontSize: 20,
        textShadowRadius:10,
        textShadowColor:'#FFF',
        textDecorationLine: 'underline',
        margin: 10
    },

    container1: {
        flex: 1,
        backgroundColor: '#80B28B',
        margin:10,
        borderRadius:8,
        height: 210,
        borderColor: "#2F4730",
        borderWidth: 2,


    },

});



export default AssistanceStatisticsScreen;
