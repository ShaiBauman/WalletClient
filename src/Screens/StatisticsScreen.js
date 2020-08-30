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
import Spinner from "react-native-loading-spinner-overlay";

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

                <View style={styles.chartsContainer}>
                <ScrollView>
                    {stats}
                    <Text style={styles.chartsTitle}>Monthly Spending By Category</Text>
                    {pie}
                </ScrollView>
                    <Spinner
                        visible={user_state.is_loading}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
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
    spinnerTextStyle: {
        color: '#FFF'
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
