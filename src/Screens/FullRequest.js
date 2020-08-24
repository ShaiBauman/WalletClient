import React, {useContext} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container,Text} from 'native-base';
import {StyleSheet, TouchableOpacity, Alert} from "react-native";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import {NavigationEvents} from "react-navigation";

const FullRequest = ({ navigation }) => {

    const {approveByPasses, deleteRequest, state, clearErrorMessage, clearSuccessMessage,
        remindFriends, ReactToRequest} = useContext(RequestContext);
    const user_state = useContext(UserContext).state;

        const req = navigation.getParam('req');


    const edit_buttons = [];
    const friend_buttons = [];
    edit_buttons.push(<TouchableOpacity onPress={() => {
            navigation.navigate("makePurchase", {'req': req})
        }}>
            <Text style={styles.activeButton}>Edit Request</Text>
        </TouchableOpacity>);

    edit_buttons.push(<TouchableOpacity onPress={() => {
            deleteRequest(req["_id"]);
        }}>
            <Text style={styles.activeButton}>Regret Request</Text>
        </TouchableOpacity>
    );
    edit_buttons.push(<TouchableOpacity onPress={() => {
            remindFriends(req["_id"]); // need to check this function

        }}>
            <Text style={styles.button}>Remind My Friends</Text>
        </TouchableOpacity>
    );//2
    edit_buttons.push(<TouchableOpacity onPress={() => {
            approveByPasses(user_state.id,req["_id"]); //need to check this function
        }}>
            <Text style={styles.button}>Use One Of My Passes  </Text>
        </TouchableOpacity>
    );//3

    edit_buttons.push(        <TouchableOpacity onPress={() => {
            navigation.navigate("Generator", {'req': req})
        }}>
            <Text style={styles.button}>Use the bot!</Text>
        </TouchableOpacity>
    ); //4

    friend_buttons.push(
        <TouchableOpacity onPress={() => {
            ReactToRequest(req["_id"],user_state.myUser.email,1);

        }}>
            <Text style={styles.button}>Approve Request</Text>
        </TouchableOpacity>
    );

    friend_buttons.push(
        <TouchableOpacity onPress={() => {
            ReactToRequest(req["_id"],user_state.myUser.email,2);
        }}>
            <Text style={styles.button}>Reject Request</Text>
        </TouchableOpacity>
    );

      return (
        <Container style={styles.container}>

            <NavigationEvents
                onWillBlur={()=>{
                    clearErrorMessage();
                    console.log("aaa")
                    clearSuccessMessage()
                }}/>
            <Text style={styles.title}> {req.description} </Text>
            <Text style={styles.subTitle}> {"Cost: "+ req.cost} </Text>
            <Text style={styles.subTitle}> {"Category: "+req.category} </Text>
            <Text style={styles.subTitle}> {"Open Date: "+new Date(req.openDate).toDateString()} </Text>
            <Text style={styles.SubSubTitle}> {"Additional Description : "+req.additionalDescription} </Text>

            <Spacer>
                {(req.confirmationStatus < 2 && req.email === user_state.myUser.email)? edit_buttons : null}
                { req.email !== user_state.myUser.email ? friend_buttons : null }
                {state.successMessage ?
                    (<Text style={styles.successMessage}>{state.successMessage}</Text>)
                    :null}
                {state.errorMessage ?
                    (<Text style={styles.errorMessage}>{state.errorMessage}</Text>)
                    :null}

            <NavLink
                routeName={"dashboard"}
                text={"Return To Home Page"}
            />
            </Spacer>
        </Container>
    )
};



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
