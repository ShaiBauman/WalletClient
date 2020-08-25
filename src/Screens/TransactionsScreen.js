import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {Context as FinancialContext} from "../context/FinancialContext";
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container, Content,  ListItem, Text, Separator, Right, Left } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

const TransactionScreen = ({navigation})=>{
    const user_state = useContext(UserContext).state;
    const req_state = useContext(RequestContext).state;
    const financial_state = useContext(FinancialContext).state;
    const {getApprovedReq, getPaidReq, getRequestById, changeApprovedToPaid } = useContext(RequestContext);
    const {getLastDigitsCreditCard, makeTransaction} = useContext(FinancialContext);

    useEffect(() => {
        getPaidReq(user_state.myUser.email);
        getApprovedReq(user_state.myUser.email);
        getLastDigitsCreditCard(user_state.id);
    }, []);

    let closedReqsJSX = [];
    let reqToBuyJSX = [];

    const alertIndex =(data)=> {
            if(!financial_state.lastDigits) {
                Alert.alert("There is no credit card to charge", "Please add your credit card" );
                return;
            }

            Alert.alert(
                'Buy',
                'Are you sure that you want to load your prepaid card that ends in '+financial_state.lastDigits+'?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => undefined,
                        style: 'cancel'
                    },
                    { text: 'OK', onPress: () => {
                            makeTransaction(user_state.id, data["_id"]);
                            changeApprovedToPaid(user_state.id, data)
                        } }
                ],
                { cancelable: false }
            );

    };

    const element = (data) => {
        return (
            <TouchableOpacity onPress={() => {
                alertIndex(data)
            }}>
                <FontAwesome5 name="money-check-alt" size={24} color="black"/>

            </TouchableOpacity>
        )};
    if (req_state.ApprovedReq) {
    for (let com of req_state.ApprovedReq) {
        reqToBuyJSX.push(
            <ListItem>
                <Left>
                    <Text style={styles.list}>
                        {new Date(com.openDate).toDateString()} - {com.description} - {com.cost}
                    </Text>
                </Left>
                <Right>
                    {element(com)}
                </Right>
            </ListItem>
        )
    }
    }
    if (req_state.PaidReq) {
        for (let close of req_state.PaidReq) {
            closedReqsJSX.push(
                <ListItem>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('FullR', {"req": close})
                    }}>
                        <Text style={styles.list}>
                            {new Date(close.openDate).toDateString()} - {close.description} - {close.cost}
                        </Text>
                    </TouchableOpacity>
                </ListItem>
            )
        }
    }

    return(
                <Container style={styles.container}>
                    <Content>
                        <Separator bordered>
                    <Text style={styles.title}>Request You Can Realize Now</Text>
                     </Separator>
                {reqToBuyJSX}
                        <Separator bordered>
                    <Text style={styles.title}>Closed Requests</Text>
                        </Separator>
                {closedReqsJSX}
            </Content>
        </Container>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,

        borderWidth: 2
    },
    title:{
        color: "black",
        textAlign: 'center',
        fontSize:15,
        fontWeight: "bold",
        marginBottom:0,
        alignItems:'center',

    },
icon:{
        alignSelf:"center"

},
    list:{
        textAlign: 'center',
    }

});

export default TransactionScreen;
