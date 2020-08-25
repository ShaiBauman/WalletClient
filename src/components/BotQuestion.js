import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';

const BotQuestion = ({item, mainParams}) => {

    const [toRefresh, setToRefresh] = useState(mainParams.answerSelected[mainParams.questionNum])
    console.log("the value of question " +mainParams.questionNum + " is " + mainParams.answerSelected[mainParams.questionNum])
    let stateObj = []
    let counter = 0
    for (let answer of item.possibleAnswers) {
        stateObj.push({
            "id": counter,
            "color": toRefresh === counter ? "green" : "black",
            "answer": answer.answer,
            "points": answer.points
        })
        counter++
    }

    const answerPressed = (item, answer) => {
        if (toRefresh !== 7) {
            mainParams.totalScore -= stateObj[toRefresh].points
        }
        mainParams.totalScore += answer.points
        mainParams.answerSelected[mainParams.questionNum] = answer.id
        setToRefresh(answer.id)
        return answer
    }

    return (
        <View key={item._id} style={{flex:1, position:'absolute', backgroundColor: 'white'}}>
            <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    {item.question}
                </Text>
            </View>
            <View style={{flex:3}}>
                {stateObj.map((answer) =>
                    <View key={answer.id} style={{ flexDirection:'row', flex:1, paddingTop: 20 }}>
                        <AntDesign id={answer.id} name="check" size={24} color={answer.color} style={{paddingLeft:20, flex: 1}}/>
                        <TouchableOpacity style={{flex: 6}} onPress={()=> answerPressed(item, answer)}>
                            <Text style={{height: 50}}>
                                {answer.answer}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default BotQuestion;
