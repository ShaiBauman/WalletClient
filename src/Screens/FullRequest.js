import React, {useContext, useEffect} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container,Text} from 'native-base';
import {StyleSheet, View, TouchableOpacity, Alert} from "react-native";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import {NavigationEvents} from "react-navigation";
import {FontAwesome5} from "@expo/vector-icons";

const FullRequest = ({ navigation }) => {

    const {getRequestsByPass, deleteRequest, state, clearErrorMessage, clearSuccessMessage, remindFriends} = useContext(RequestContext);
    const {id} = useContext(UserContext);

        const req = navigation.getParam('req');

    const onClickListener = () => {
        Alert.alert("", state.successMessage);
    };

    const element = [];
    element.push(<TouchableOpacity onPress={() => {
            navigation.navigate("makePurchase", {'req': req})
        }}>
            <Text style={styles.activeButton}>Edit Request</Text>
        </TouchableOpacity>) //0

    element.push(<TouchableOpacity onPress={() => {
            console.log("req id: "+ req._id)
            deleteRequest(req._id)
            onClickListener()

        }}>
            <Text style={styles.activeButton}>Regret Request</Text>
        </TouchableOpacity>
    ) //1
    element.push(<TouchableOpacity onPress={() => {
            remindFriends(req._id) // need to check this function
            onClickListener()

        }}>
            <Text style={styles.button}>Remind My Friends</Text>
        </TouchableOpacity>
    )//2
    element.push(<TouchableOpacity onPress={() => {
            getRequestsByPass(id,req) //need to check this function
            onClickListener()
            navigation.navigate("dashboard")
        }}>
            <Text style={styles.button}>Use One Of My Passes  </Text>
        </TouchableOpacity>
    )//3

    element.push(        <TouchableOpacity onPress={() => {
            navigation.navigate("Generator", {'req': req})
        }}>
            <Text style={styles.button}>Use Bot!</Text>
        </TouchableOpacity>
    ) //4

      return (
        <Container style={styles.container}>

            <NavigationEvents
                onWillBlur={()=>{clearErrorMessage()
                    clearSuccessMessage()
                }}/>
            <Text style={styles.title}> {req.description} </Text>
            <Text style={styles.subTitle}> {"Cost: "+ req.cost} </Text>
            <Text style={styles.subTitle}> {"Category: "+req.category} </Text>
            <Text style={styles.subTitle}> {"Open Date: "+new Date(req.openDate).toDateString()} </Text>
            <Text style={styles.SubSubTitle}> {"Additional Description : "+req.additionalDescription} </Text>

            <Spacer>
                {req.confirmationStatus === 2 ? element : null}
                {state.errorMessage ?
                    (<Text style={styles.errorMessage}>{state.errorMessage}</Text>)
                    :null}

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
        marginLeft: 40,
        marginTop:0,
        marginRight:40,
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
        marginLeft: 40,
        marginTop:0,
        marginRight:40,

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
    SubSubTitle:{
        fontSize: 10,
        textAlign: "center",
    },
    errorMessage:{
        fontSize:16,
        color:'red',
        marginLeft:15

    }
});
export default FullRequest
