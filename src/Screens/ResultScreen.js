import React, {useContext, useEffect} from 'react'
import { View, Text } from 'react-native'
import {Context as BotContext} from "../context/BotContext";

const ResultScreen = (props) => {

    const { state, getMLStatus } = useContext(BotContext)

    let totalScore = props.navigation.state.params.mainParams.totalScore

    useEffect(() => {
        getMLStatus("5f3e43fe66fae18720de3f86", "fake576@gmail.com", totalScore)
    }, []);

    return (
        <View>
            <Text>
                Your Result is: {state.ml_status}
            </Text>
        </View>
    )
}

export default ResultScreen
