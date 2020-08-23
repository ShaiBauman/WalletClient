import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {Text} from "react-native-elements";
import {Context as UserContext} from "../context/UserContext";
import {NavigationEvents} from "react-navigation";


const PasswordRecoveryScreen = () =>
{

    const {state, clearErrorMessage, verificationPasswordAnswer,updatePassword} = useContext(UserContext);
    const [password, setPassword] = useState([])
    const [email, setEmail] = useState([])
    const [answer, setAnswer] = useState([])

    let changePassJSX = []

    if (state.isAnswerCorrect) {
        changePassJSX.push(
            <TextInput
                autoCapitalize="none"
                placeholder="Insert new password"
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}/>
        )
        changePassJSX.push(
            <TouchableOpacity
                title="Confirm"
                onPress={() => {
                    updatePassword(email, password)
                }}
            >
                <Text style={styles.buttonSingUp}>{"Confirm"}</Text>
            </TouchableOpacity>
        )
    } else {
        changePassJSX.push(
            <TextInput
                autoCapitalize="none"
                placeholder="Insert Your Email"
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
            />
        )

        changePassJSX.push(
            <TextInput
                autoCapitalize="none"
                placeholder="Who Is Your Favorite Lecturer?"
                value={answer}
                onChangeText={setAnswer}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
            />
        )
        changePassJSX.push(
            <TouchableOpacity
                title="Continue"
                onPress={() => {
                    verificationPasswordAnswer(email, answer)
                }}>
                <Text style={styles.buttonSingUp}>{"Continue"}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={() => clearErrorMessage()}/>
            <Text style={styles.title}>Password Recovery</Text>
            {changePassJSX}
        </View>
      );
};

PasswordRecoveryScreen.navigationOptions =()=> {
    return {
        header: null
    };
};

const styles = StyleSheet.create({

    title: {
        fontSize:35,
        textAlign: "center",
        borderColor: 'black',
        marginTop:60
    },

    container:{
        flex: 1,
        margin:0,
        backgroundColor:'#E9D2B3',
        borderColor:'#E9D2B3',
    },

    buttonContainer: {
        marginLeft:20,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CEB386'
    },
    textStyle:{
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 4,
        marginBottom: 0
    },
    inputStyle:{
        height: 50,
        fontSize:18,
        marginRight:12,
        marginLeft:12,
        marginBottom:0,
        marginTop:15,
        borderWidth:0.5,
        borderColor:'black',
        textAlign: "center",
    },
    button: {
        alignItems: "center",
        borderColor: '#2F4730',
        borderWidth:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        paddingLeft:18,
        backgroundColor:'#80B28B',
        marginRight:12,
        marginTop:0,
        borderRadius:8,
        fontSize: 10,
        fontWeight: 'bold',
        overflow: 'hidden',

    },
    buttonSingUp: {
        textAlign: "center",
        paddingVertical:10,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:0,
        marginLeft: 12,
        marginTop:30,
        marginRight:12,

    },
    errorMessage:{color: 'red', textAlign:'center',marginTop:10}


});

export default PasswordRecoveryScreen;
