import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {NavigationEvents} from "react-navigation";
import {Context as UserContext} from "../context/UserContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";


const SignInScreen = ()=>{
    const { state, login, clearErrorMessage } = useContext(UserContext);

    console.log(state);
    console.log(state.email);

    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}/>
            <Image style={styles.tinyLogo} source={require('../../assets/WLT.jpeg')}/>

            <AuthForm
                header={"WallLet"}
                errorMessage={state.errorMessage}
                submitButtonText={"Sign In"}
                onSubmit={login}
            />
            <NavLink
                routeName={"PasswordRecovery"}
                text={"Password Recovery"}
            />
            <NavLink
                routeName={"Registration"}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#E9D2B3',
        padding: 8,
    },
    tinyLogo: {
        width: 100,
        height: 100,
        display: "flex",
        marginLeft:'20%',
        alignContent:'center',
        padding: '30%',
        marginTop:20
    }
});
export default SignInScreen;
