import React, {useContext, useEffect} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container,Text} from 'native-base';
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import {Button, StyleSheet} from "react-native";
import NavLink from "../components/NavLink";

const FullRequest = ({ navigation }) => {

    const {getRequestsByPass} = useContext(RequestContext);
    const {id} = useContext(UserContext);

        const req = navigation.getParam('req');

      return (
        <Container style={styles.container}>
            <Text style={styles.title}> {req.description} </Text>
            <Text style={styles.subTitle}> {req.cost} </Text>
            <Text style={styles.subTitle}> {req.category} </Text>
            <Text style={styles.subTitle}> {req.openDate} </Text>

            <TouchableOpacity onPress={() => {
                navigation.navigate("makePurchase", {'req': req})
            }}>
                <Text style={styles.button}>"Edit Request"</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                // need to complete function
                navigation.navigate("dashboard")
            }}>
                <Text style={styles.button}>"Delete Request"</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                // need to complete function
                navigation.navigate("dashboard")

            }}>
                <Text style={styles.activeButton}>"Remind My Friends"</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                getRequestsByPass(id,req) //need to check this function
                navigation.navigate("dashboard")
            }}>
                <Text style={styles.activeButton}>"Use One Of My Passes"</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate("Generator", {'req': req})
            }}>
                <Text style={styles.activeButton}>"Use Bot!"</Text>
            </TouchableOpacity>

            <NavLink
                routeName={"dashboard"}
                text={"Return To Dashboard"}
            />

        </Container>
    )
}



const styles = StyleSheet.create({
button: {
    textAlign: "center",
        borderColor: '#80B28B',
        borderWidth:3,
        justifyContent: 'space-between',
        paddingVertical:20,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:60,
        marginLeft: 8,
        marginTop:0,
        marginRight:8,
    },
    activeButton: {
        textAlign: "center",
        borderColor: "#2F4730",
        borderWidth:3,
        justifyContent: 'space-between',
        paddingVertical:20,
        paddingLeft:12,
        backgroundColor:'#80B28B',
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#2F4730',
        marginBottom:60,
        marginLeft: 8,
        marginTop:0,
        marginRight:8,
    },

    container:{
        backgroundColor:'#CEB386',
        borderColor:'#CEB386',
        flex:1
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
