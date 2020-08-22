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
    const {getAllRequests } = useContext(RequestContext);
    const {getLastDigitsCreditCard, makeTransaction} = useContext(FinancialContext);

    const [lastDigits, setLastDigits ] = useState('');

    useEffect(() => {
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email);
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email);
    }, []);

    if (!lastDigits) {
        getLastDigitsCreditCard(user_state.id).then(data => setLastDigits(data));
    }
    let closedReqs = [];
    let closedReqsJSX = [];
    let reqToBuy = [];
    let reqToBuyJSX = [];

    const splitRequests = () => {
        console.log("req_state " + JSON.stringify(req_state.allRequests));
        if (req_state.allRequests) {
            for (let req of req_state.allRequests)
            {
                console.log("req " + JSON.stringify(req));
                if (req.confirmationStatus === 1) {
                    reqToBuy.push(req)
                    }
                else if (req.confirmationStatus === 2)
                    {
                        closedReqs.push(req)
                    }

            }
            for (let com of reqToBuy) {
                reqToBuyJSX.push(
                    <ListItem>
                        <Left>
                             <Text style={styles.list}>
                                {new Date(com.openDate).toDateString()} - {com.description} - {com.cost}
                            </Text>
                        </Left>
                        <Right>
                        {element(com.id)}
                        </Right>
                    </ListItem>
                )
            }
            for (let close of closedReqs) {
                closedReqsJSX.push(
                    <ListItem>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('FullR', {"req": close}) //need to change!!!
                        }}>
                            <Text style={styles.list}>
                                {new Date(close.openDate).toDateString()} - {close.description} - {close.cost}
                            </Text>
                        </TouchableOpacity>
                    </ListItem>
                )
            }
        }
    };

    splitRequests();

if (!lastDigits) {
    getLastDigitsCreditCard(user_state.id).then(data => setLastDigits(data));
}

    const alertIndex =(data)=> {
        if(!lastDigits) {
            Alert.alert("There is no credit card to charge", "Please add your credit card" );
            return;
        }

        Alert.alert(
            'Buy',
            'Are you sure that you want to load your prepaid card that ends in '+lastDigits+'?',
            [
                {
                    text: 'Cancel',
                    onPress: () => undefined,
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => makeTransaction(user_state.id, data) }
            ],
            { cancelable: false }
        );
    };

    const element = (data) => (
            <TouchableOpacity onPress={() => alertIndex(data)}>
                <FontAwesome5 name="money-check-alt" size={24} color="black"/>

            </TouchableOpacity>
        );

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
