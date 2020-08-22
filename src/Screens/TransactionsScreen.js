import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Alert,View} from 'react-native'
import {Context as FinancialContext} from "../context/FinancialContext";
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container, Header, Content,  ListItem, Text, Separator } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from "../components/Spacer";

const TransactionScreen = ({navigation})=>{


    const {state, getAllRequests} = useContext(RequestContext);
  //  const req_state = useContext(RequestContext).state
    const {state: user_state} = useContext(UserContext);
    const {getLastDigitsCreditCard, makeTransaction} = useContext(FinancialContext);

    const [lastDigits, setLastDigits ] = useState('');

    useEffect(() => {
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
    }, []);

    let closedReqs = []
    let closedReqsJSX = []
    let reqToBuy = []
    let reqToBuyJSX = []


    const splitRequests = () => {
        console.log("state " + JSON.stringify(state.allRequests))
        if (state.allRequests) {
            for (let req of state.allRequests)
            {
                console.log("req " + JSON.stringify(req))
                if (req.confirmationStatus) {
                    if (req.closedDate != null)
                    {
                        reqToBuy.push(req)
                    }
                else
                    {
                        closedReqs.push(req)
                    }
                }
            }
            for (let com of reqToBuy) {
                reqToBuyJSX.push(
                    <ListItem>
                             <Text>
                                {new Date(com.openDate).toDateString()} - {com.description} - {com.cost}
                            </Text>
                        {element(com._id)}
                    </ListItem>
                )
            }
            for (let close of closedReqs) {
                closedReqsJSX.push(
                    <ListItem>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('FullR', {"req": close}) //need to change!!!
                        }}>
                            <Text>
                                {new Date(close.openDate).toDateString()} - {close.description} - {close.cost}
                            </Text>
                        </TouchableOpacity>
                    </ListItem>
                )
            }
        }
    }

    splitRequests()



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
            <View style={styles.container}>
                <Spacer>
                  <Text style={styles.header}>Request You Can Realize</Text>
                    {reqToBuyJSX}
                    </Spacer>

                    <Spacer>
                        <Text style={styles.header}>Closed Requests</Text>
                    {closedReqsJSX}
                </Spacer>
            </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#E9D2B3',
        borderColor:'#E9D2B3',
        borderWidth: 2
    },
    header:{
        color: "black",
        textAlign: 'center',
        fontSize:30,
        textShadowRadius: 20,
        fontWeight: "bold",
        marginBottom:0,

    },
    tableTitle:{ fontWeight: "bold", textAlign: 'center', fontSize: 18, textDecorationLine: 'underline'},
    tableContainer: { padding: 4,  backgroundColor: '#E9D2B3' },
    tableHead: { justifyContent: 'center',height: 42, backgroundColor: '#80B28B' },
    tableText: {  fontSize:12, textAlign: 'center' },
    tableHeadText: {  fontSize:9, textAlign: 'center',fontWeight: "bold"},

      row: { flexDirection: 'row', backgroundColor: '#E9D2B3', borderColor: '#2F4730' },
    btn: { width: 47, height: 17, backgroundColor: '#2F4730',  borderRadius: 0, borderColor:"#E9D2B3", borderWidth:0.5 },
    btnText: { textAlign: 'center', color: '#fff' }


});

export default TransactionScreen;
