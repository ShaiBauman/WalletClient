import React, {useContext} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import  {StyleSheet} from 'react-native';
import {Context as UserContext} from "../context/UserContext";
import ProgressChart from "react-native-chart-kit/src/progress-chart";

const IndexWalletScreen = ()=>{

    const {state} = useContext(UserContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    const data = {
        labels: ["Scores","Meeting the objectives", "Approved requests"], // optional
        data: [0.8,0.4, 0.6]
    };

     ;
    return(
        <Card>
            <Card.Title title={state.name} subtitle={'email: '+state.email} left={LeftContent} />
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title style={{textAlign:"center"}}>My Target</Title>
                <Paragraph style={{textAlign:"center"}}>{"target"}</Paragraph>
            </Card.Content>

            <Card.Actions style={{padding:20, textAlign:"left"}}>
                <ProgressChart
                    data={data}
                    width={320}
                    height={220}
                    strokeWidth={16}
                    radius={26}
                    chartConfig={{
                        backgroundColor: "#2F4730",
                        backgroundGradientFrom: "#80B28B",
                        backgroundGradientTo: "#CEB386",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            textAlign:"left",
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    hideLegend={false}
                />
            </Card.Actions>
        </Card>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: '#E9D2B3',
        borderColor: '#E9D2B3',
    },
    header: {
        color: "#D76B49",
        textAlign: 'center',
        fontSize: 40,
        textShadowRadius: 20,
        fontWeight: "bold",
        marginBottom: 5,

    }
});

export default IndexWalletScreen;
