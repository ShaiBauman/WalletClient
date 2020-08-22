import React, {useContext, useEffect} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container, Header, Content, ListItem, Text, Separator } from 'native-base';
import { TouchableOpacity } from "react-native";

const OpenRequests = ({ navigation }) => {

    const { getAllRequests} = useContext(RequestContext);
    const req_state = useContext(RequestContext).state
    const user_state = useContext(UserContext).state
    useEffect(() => {
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
    }, []);

    let completedReqs = []
    let completedReqsJSX = []
    let openReqs = []
    let openReqsJSX = []

    const splitRequests = () => {
        console.log("req_state " + JSON.stringify(req_state.allRequests))
        if (req_state.allRequests) {
            for (let req of req_state.allRequests) {
                console.log("req " + JSON.stringify(req))
                if (req.confirmationStatus) {
                    completedReqs.push(req)
                } else {
                    openReqs.push(req)
                }
            }
            for (let com of completedReqs) {
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
            }
            for (let open of openReqs) {
                openReqsJSX.push(
                    <ListItem>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('FullR', {"req": open})
                        }}>
                        <Text>
                            {new Date(open.openDate).toDateString()} - {open.description} - {open.cost}
                        </Text>
                        </TouchableOpacity>
                    </ListItem>
                )
            }
        }
    }

    splitRequests()



    return (
        <Container>
            <Header />
            <Content>
                <Separator bordered>
                    <Text>Completed</Text>
                </Separator>
                {completedReqsJSX}
                <Separator bordered>
                    <Text>Open</Text>
                </Separator>
                {openReqsJSX}
            </Content>
        </Container>
    );
}

export default OpenRequests
