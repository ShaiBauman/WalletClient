import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import { PieChart } from 'react-native-svg-charts'


const PieChartForm = (data)=>{

        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

        const pieData = data.filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }));

        return( <PieChart style={{ height: 200 }} data={pieData} />);

};

export default PieChartForm;
