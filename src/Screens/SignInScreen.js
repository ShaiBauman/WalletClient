import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NavigationEvents} from "react-navigation";
import {Context as UserContext} from "../context/UserContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";


const SignInScreen = ({navigation})=>{
    const { state, login, clearErrorMessage } = useContext(UserContext);

    console.log(state);
    console.log(state.email);

    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}/>
            <AuthForm
                header={"Sign In to Your Account"}
                errorMessage={state.errorMessage}
                submitButtonText={"Sign In"}
                onSubmit={signIn}
            />
            <NavLink
                routeName={"SignUp"}
                text={"Don't have an account? Sign up instead"}
            />
        </View>
    );
};

SignInScreen.navigationOptions =()=> {
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
export default SignInScreen;
