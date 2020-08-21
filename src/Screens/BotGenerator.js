import React, { useContext, useEffect } from 'react'
import { Context as BotContext } from "../context/BotContext"
import { View, Text } from "react-native"
import BotQuestion from "../components/BotQuestion";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const BotGenerator = ({ navigation }) => {

    const { state, getBotQuest } = useContext(BotContext)

    useEffect(() => {
        getBotQuest()
    }, []);

    const defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            //justifyContent: 'center'
        }
    };

    let mainParams = {totalScore:0, answerSelected: Array(6).fill(7), questionNum: 0}

    const onNextStep = () => {
        mainParams.questionNum++
    }

    const onPrevStep = () => {
        mainParams.questionNum--
    }

    const onSubmitSteps = () => {
        navigation.navigate("Result", {"mainParams": mainParams})
    };

    const progressStepsStyle = {
        activeStepIconBorderColor: '#686868',
        activeLabelColor: '#686868',
        activeStepNumColor: 'white',
        activeStepIconColor: '#686868',
        completedStepIconColor: '#686868',
        completedProgressBarColor: '#686868',
        completedCheckColor: '#4bb543',
        topOffset: -20
    };

    const buttonTextStyle = {
        color: '#686868',
        fontWeight: 'bold'
    };
    if (state.bot_arr === undefined) {
        return <View><Text>Loading</Text></View>
    } else {
        let ProgressJSX = []
        let counter = 0
        for (let item of state.bot_arr) {
            counter = counter + 1
            ProgressJSX.push(
                <ProgressStep
                    key={item._id}
                    label={`Q #${counter}`}
                    scrollViewProps={defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    onNext={onNextStep}
                    onPrevious={onPrevStep}
                    onSubmit={onSubmitSteps}
                >
                    <View>
                        <BotQuestion item={item} mainParams={mainParams}/>
                    </View>
                </ProgressStep>
            )
        }
        return (
            <View style={{flex: 1, paddingTop: 80, paddingLeft:20, paddingRight:20, backgroundColor: 'white'}}>
                <ProgressSteps {...progressStepsStyle}>
                    {ProgressJSX}
                </ProgressSteps>
            </View>
        )
    }
}

export default BotGenerator;
