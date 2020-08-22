import React, {useContext, useEffect} from 'react'
import { View, Text } from 'react-native'
import {Context as BotContext} from "../context/BotContext";

const ResultScreen = ({ navigation }) => {

    const req = navigation.getParam('req');
    const totalScore = navigation.getParam('mainParams').totalScore;

    const { state, getMLStatus } = useContext(BotContext)

    useEffect(() => {
        getMLStatus(req._id, req.email, totalScore)
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
