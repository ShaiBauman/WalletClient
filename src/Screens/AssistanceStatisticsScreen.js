import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native'
import {Text} from "react-native-elements";
import { Dimensions } from "react-native";

import {BarChart,ProgressChart} from "react-native-chart-kit";
import { data } from "react-native-chart-kit/data";

const AssistanceStatisticsScreen = ()=>{
    const dataRings = {
        labels: ["Approved", "Refused", "Open"],
        data: [0.6, 0.2, 0.1],

    };


        const barData = {
            labels: ["friend 1", "friend 2", "friend 3", "friend 4", "friend 5", "friend 6"],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99, 43]
                }
            ]
        };



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


    const screenWidth = (Dimensions.get("window").width);

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
    const chartConfig2 = {
        type: "column2d",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Countries With Most Oil Reserves [2017-18]",
                subCaption: "In MMbbl = One Million barrels",
                xAxisName: "Country",
                yAxisName: "Reserves (MMbbl)",
                numberSuffix: "K",
                theme: "fusion"
            },
            data: chartData
        }
    };


    return(
        <View style={styles.container}>
            <Text style={styles.header}>My Statistics</Text>

            <View style={styles.chartsContainer}>
                <ScrollView>
                    <Text style={styles.chartsTitle}>Balance requests</Text>

                    <ProgressChart
                       //style={styles.container1}
                        data={dataRings}
                        width={300}
                        height={220}
                        strokeWidth={14}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />


                    <Text style={styles.chartsTitle}>Monthly savings for my friends</Text>
                    <BarChart
                        style={styles.container1}
                        data={barData}
                        width={320}
                        height={240}
                        yAxisLabel="₪"
                        withHorizontalLabels={true}
                        chartConfig={chartConfig}
                        verticalLabelRotation={20}
                        showBarTops={true}
                    />


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
