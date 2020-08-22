import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import Spacer from "./Spacer";
import {Text} from "react-native-elements";


const AuthForm = ({header, errorMessage, onSubmit, submitButtonText})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <Spacer>
                <Text style={styles.paragraph}>{header}</Text>
            </Spacer>
            <TextInput
                style={styles.inputStyle}
                placeholderTextColor={'#2f4730'}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <Spacer/>
            <TextInput
                secureTextEntry={true}
                style={styles.inputStyle}
                placeholderTextColor={'#2f4730'}
                maxLength={10}
                minLength={5}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
            />
            {errorMessage ?
                (<Text style={styles.errorMessage}>{errorMessage}</Text>)
                :null}
            <Spacer>
                <TouchableOpacity
                    title={submitButtonText}
                    onPress={
                    ()=> {
                        onSubmit(email, password),
                            setEmail(''),
                            setPassword('')
                    }

                }>
                    <Text style={styles.button}>
                        {submitButtonText}
                    </Text>
                </TouchableOpacity>

            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage:{
        fontSize:16,
        color:'red',
        marginLeft:15

    },
    paragraph: {
        margin: 24,
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    inputStyle:{
        backgroundColor:'#80B28B',
        height: 40,
        fontSize:12,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        borderBottomWidth:0.3,
        borderColor:'black',
        textAlign: "center"
    },
    button: {
        textAlign: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth:10,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        paddingLeft:18,
        backgroundColor: '#2f4730',
        marginTop:5,
        fontSize: 15,
        color:'#80B28B',
        height: 15,
        fontWeight: 'bold',
        overflow: 'hidden',

    },

});

export default AuthForm;
