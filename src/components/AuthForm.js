import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'
import Spacer from "./Spacer";
import {Text, Button, Input} from "react-native-elements";


const AuthForm = ({header, errorMessage, onSubmit, submitButtonText})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <Spacer>
                <Text h3>{header}</Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <Spacer/>
            <Input
                secureTextEntry={true}
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
            />
            {errorMessage ?
                (<Text style={styles.errorMessage}>{errorMessage}</Text>)
                :null}
            <Spacer>
                <Button
                    title={submitButtonText}
                    onPress={
                        ()=> onSubmit(email, password)
                    }
                />
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
});

export default AuthForm;
