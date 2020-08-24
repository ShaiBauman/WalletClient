import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, ScrollView} from 'react-native'
import {Context as StatisticsContext} from '../context/StatisticsContext'
import {Context as UserContext} from '../context/UserContext'
import {Text} from "react-native-elements";
import { Dimensions } from "react-native";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const StatisticsScreen = ()=>{

    const user_state = useContext(UserContext).state
    const {state, approveVsAll, approvedVsDenied, MonthlyBalance, MoneyISaved} = useContext(StatisticsContext)

    useEffect(()=> {
        approveVsAll(user_state.myUser.email)
        approvedVsDenied(user_state.myUser.email)
        MonthlyBalance(user_state.myUser.email)
        MoneyISaved(user_state.myUser.email)
    }, [])

    const paiData = [
        {
            name: "Appliances",
            population: 3,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#2F4730",
            legendFontSize: 15
        },
        {
            name: "Clothing",
            population: 9,
            color: "rgb(200, 110, 120)",
            legendFontColor: "#2F4730",
            legendFontSize: 15
        },
        {
            name: "Food",
            population: 27,
            color: "rgb(170, 227, 90)",
            legendFontColor: "#2F4730",
            legendFontSize: 15
        },
        {
            name: "Attractions",
            population: 12,
            color: "rgb(82, 200, 170)",
            legendFontColor: "#2F4730",
            legendFontSize: 15
        },
        {
            name: "Toiletries",
            population: 4,
            color: "rgb(40, 160, 200)",
            legendFontColor: "#2F4730",
            legendFontSize: 15
        }
    ];


    const barData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const stackedBarData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        legend: ["Approve", "Unapproved"],
        data: [[60, 60], [30, 30], [72, 10], [20, 90], [10, 50],[60, 40]],
        barColors: ["blue", "red"]
    };


    const chartConfig = {
        backgroundGradientFrom: "#80B28B",
        backgroundGradientFromOpacity: 10,
        backgroundGradientTo: "#2F4730",
        backgroundGradientToOpacity: 10,
        color: (opacity = 1) => "#2F4730",
        font:10,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        legendFontSize:50,
    };

    const chartData = [
        { label: "Venezuela", value: "290" },
        { label: "Saudi", value: "260" },
        { label: "Canada", value: "180" },
        { label: "Iran", value: "140" },
        { label: "Russia", value: "115" },
        { label: "UAE", value: "100" },
        { label: "US", value: "30" },
        { label: "China", value: "30" }
    ];

    let stats = []
    stats.push(
        <Text>
            Your approved transactions vs all your transactions ratio is {state.approveVsAll}
        </Text>
    )
    stats.push(    <Text>
            Your approved transactions are {state.approvedVsDenied["Approved"]}
            Your denied transactions are {state.approvedVsDenied["Denied"]}
        </Text>
    )
    stats.push(<Text>
            Your target minus your expenses is {state.MonthlyBalance}
    </Text>
    )
    stats.push( <Text>
            The amount of money of your denied transactions is {state.MoneyISaved}
    </Text>
    )



    return(
        <View style={styles.container}>
            <Text style={styles.header}>My Statistics</Text>

                <View style={styles.chartsContainer}>
                <ScrollView>
                    {stats}
                <Text style={styles.chartsTitle}>Balance Monthly Expenses</Text>
                 <BarChart
                    data={barData}
                    width={320}
                    height={240}
                    yAxisLabel="₪"
                    withHorizontalLabels={true}
                    chartConfig={chartConfig}
                    verticalLabelRotation={20}
                    showBarTops={true}
                />
                <Text style={styles.chartsTitle}>Monthly Spending By Category</Text>
                    <View style={{backgroundColor: "rgb(109, 153, 118)"}}>
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
                    </View>

                <Text style={styles.chartsTitle}> Monthly Approval Status</Text>
                <StackedBarChart
                    data={stackedBarData}
                    width={320}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    withHorizontalLabels={true}
                    barPercentage={0.2}

                />
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin:5,
        backgroundColor:'#80B28B',
        borderColor:'#80B28B',
    },
    header:{
        color: "black",
        textAlign: 'center',
        fontSize:30,
        textShadowRadius: 20,
        fontWeight: "bold",
        marginBottom:0,

    },

    title:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 25,

    },

    chartsContainer:{
        marginLeft:5,
        marginRight:5,
        flexDirection: 'column',
        alignItems: 'center',
        flex:1,


    },
    chartsTitle:{ fontWeight: "bold", textAlign: 'center', fontSize: 18, textDecorationLine: 'underline', marginTop: 10},
    containerChart: {
        flex: 1,
        marginRight:5,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    },
    container1: {
        flex: 1,

        padding: 10
    },

    header1: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        paddingBottom: 10
    },

    chartContainer1: {
        height: 400,
        borderColor: "#000",
        borderWidth: 1
    }
});



export default StatisticsScreen;
