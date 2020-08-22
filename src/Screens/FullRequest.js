import React, {useContext, useEffect} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container,Text} from 'native-base';
import {StyleSheet, View, TouchableOpacity, Alert} from "react-native";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import {NavigationEvents} from "react-navigation";

const FullRequest = ({ navigation }) => {

    const {getRequestsByPass, deleteRequest, state, clearErrorMessage, clearSuccessMessage} = useContext(RequestContext);
    const {id} = useContext(UserContext);

        const req = navigation.getParam('req');

    const onClickListener = () => {
        // need to complete !!!
        Alert.alert("", state.successMessage);
    };



      return (
        <Container style={styles.container}>

            <NavigationEvents
                onWillBlur={clearErrorMessage}/>
            <NavigationEvents
                onWillBlur={clearSuccessMessage}/>

            <Text style={styles.title}> {req.description} </Text>
            <Text style={styles.subTitle}> {"Cost: "+ req.cost} </Text>
            <Text style={styles.subTitle}> {"Category: "+req.category} </Text>
            <Text style={styles.subTitle}> {"Open date: "+new Date(req.openDate).toDateString()} </Text>
            <Spacer>
            <TouchableOpacity onPress={() => {
                navigation.navigate("makePurchase", {'req': req})
            }}>
                <Text style={styles.activeButton}>Edit Request</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                console.log("req id: "+ req._id)
                deleteRequest(req._id)
                onClickListener()

            }}>
                <Text style={styles.activeButton}>Delete Request</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                // need to complete function
                navigation.navigate("dashboard")

            }}>
                <Text style={styles.button}>Remind My Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                getRequestsByPass(id,req) //need to check this function
                navigation.navigate("dashboard")
            }}>
                <Text style={styles.button}>Use One Of My Passes  </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate("Generator", {'req': req})
            }}>
                <Text style={styles.button}>Use Bot!</Text>
            </TouchableOpacity>

            <NavLink
                routeName={"dashboard"}
                text={"Return To Dashboard"}
            />
            </Spacer>
        </Container>
    )
}



const styles = StyleSheet.create({
button: {
    textAlign: "center",
        justifyContent: 'space-between',
        paddingLeft:12,
        backgroundColor:'#2F4730',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:20,
        marginLeft: 50,
        marginTop:0,
        marginRight:50,
    },
    activeButton: {
        textAlign: "center",
        justifyContent: 'space-between',
        paddingLeft:12,
        backgroundColor:'#80B28B',
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#2F4730',
        marginBottom:20,
        marginLeft: 50,
        marginTop:0,
        marginRight:50,

    },

    container:{
        backgroundColor:'white',
        borderColor:'white',
        flex:1,margin:10
    },
    title:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: 'bold'
    },

    subTitle:{
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold'
    },
});
export default FullRequest
