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
    const {state, approveVsAll, approvedVsDenied, MonthlyBalance, MoneyISaved, expenseByCategory} = useContext(StatisticsContext)

    useEffect(()=> {
        approveVsAll(user_state.myUser.email)
        approvedVsDenied(user_state.myUser.email)
        MonthlyBalance(user_state.myUser.email)
        MoneyISaved(user_state.myUser.email)
        expenseByCategory(user_state.myUser.email)
    }, [])


    const barData = {
        labels: [],
        datasets: [{data: []}]
    };
    let no_data = true
    if (JSON.stringify(state.expenseByCategory) !== '{}') {
        no_data = false
        console.log(state.expenseByCategory !== {})
        console.log(state.expenseByCategory)
        for (const label in state.expenseByCategory) {
            barData.labels.push(label)
            barData.datasets[0].data.push(state.expenseByCategory[label])
        }
    }


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

    let stats = []
   stats.push(
        <Text style={styles.text1}>Percentage of requests approved for me</Text>)
    stats.push(<Text style={styles.text2}>{((state.approveVsAll)*100).toFixed()}%</Text>
    )

    let pie = []
    console.log("no_data " + no_data)

    if (!no_data) {
        pie.push(
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
            )
    } else {
        pie.push(<Text>
            No Data Assigned Yet..
        </Text>)
    }



    return(
        <View style={styles.container}>
            <Text style={styles.header}>My Statistics</Text>
                <ScrollView>
                    {stats}
                    <Text style={styles.chartsTitle}>Monthly Spending By Category</Text>
                    <View style={styles.chartsContainer}>
                    {pie}
                    </View>
                </ScrollView>
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
        marginBottom:20,

    },

    title:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20

    },

    text1:{
        textAlign: 'center',
        fontSize: 20,

    },
    text2:{
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 25,

    },

    chartsContainer:{
        margin:15,
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
