import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input,Button} from "react-native-elements";
import AuthForm from "../components/AuthForm";
import {Context as AuthContext} from '../context/AuthContext';
import NavLink from "../components/NavLink";
import {NavigationEvents} from "react-navigation";

const SignUpScreen = ({navigation})=>{
    const { state, signIn, clearErrorMessage } = useContext(AuthContext);
    console.log(state);

    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                header={"Sign Up for Tracker"}
                errorMessage={state.errorMessage}
                submitButtonText={"Sign UP"}
                onSubmit={signUp}
            />
            <NavLink
                routeName={"SignIn"}
                text={"Already have an account? Sign in instead!"}
            />
        </View>
    );
};

SignUpScreen.navigationOptions =()=> {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginBottom:10
    }

});

export default SignUpScreen;
