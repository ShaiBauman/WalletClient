import React, {useContext, useEffect} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container, Header, Content, ListItem, Text, Separator,Left,Right } from 'native-base';
import {StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

const OpenRequests = ({ navigation }) => {

    const {getAllRequests} = useContext(RequestContext);
    const req_state = useContext(RequestContext).state
    const user_state = useContext(UserContext).state

    useEffect(() => {
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
    }, []);

    //let completedReqs = []
    // let completedReqsJSX = []
    let openReqs = []
    let openReqsJSX = []

    const splitRequests = () => {
        console.log("req_state " + JSON.stringify(req_state.allRequests))
        if (req_state.allRequests) {
            for (let req of req_state.allRequests) {
                console.log("req " + JSON.stringify(req))
                if (req.confirmationStatus === 0) { //
                    //   completedReqs.push(req)

                    openReqs.push(req)

                }
                /* for (let com of completedReqs) {
                     completedReqsJSX.push(
                         <ListItem>
                             <TouchableOpacity onPress={() => {
                                 navigation.navigate('FullR', {"req": com})
                             }}>
                             <Text>
                                 {new Date(com.openDate).toDateString()} - {com.description} - {com.cost}
                             </Text>
                             </TouchableOpacity>
                         </ListItem>
                     )
                 }*/
                for (let open of openReqs) {
                    openReqsJSX.push(
                        <ListItem>
                            <Left>
                                <Text>
                                    {new Date(open.openDate).toDateString()} - {open.description} - {open.cost}
                                </Text>
                            </Left>
                            <Right>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('FullR', {"req": open})
                                }}>
                                    <Feather name="arrow-right-circle" size={24} color="black" style={styles.icon}/>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )
                }
            }
        }

        splitRequests()


        return (
            <Container style={styles.container}>

                <Content>
                    <Separator bordered>
                        <Text style={styles.title}>Open Requests</Text>
                    </Separator>
                    {openReqsJSX}
                </Content>
            </Container>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,

            borderWidth: 2
        },
        title: {
            color: "black",
            textAlign: 'center',
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 0,
            alignItems: 'center',

        }


    });
}


export default OpenRequests;
