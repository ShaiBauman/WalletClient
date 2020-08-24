import React, {useContext, useEffect} from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import  {StyleSheet} from 'react-native';
import {Context as UserContext} from "../context/UserContext";
import ProgressChart from "react-native-chart-kit/src/progress-chart";

const IndexWalletScreen = ()=>{

    useEffect(()=>{
        getPasses(state.myUser.email);
    },[]);



    const {state, getPasses} = useContext(UserContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return(
        <Card>
            <Card.Title title={state.myUser.firstName+' '+state.myUser.lastName} subtitle={'email: '+state.myUser.email} left={LeftContent} />
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title style={{textAlign:"center", marginTop:40 }}>My Target</Title>
                <Paragraph style={{textAlign:"center"}}>{state.myUser.myTarget}</Paragraph>
                <Title style={{textAlign:"center", marginTop:20}}>My Passes</Title>
                <Paragraph style={{textAlign:"center"}}>{state.passes}</Paragraph>
            </Card.Content>

            <Card.Actions style={{padding:20, textAlign:"left"}}>

            </Card.Actions>
        </Card>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: '#E9D2B3',
        borderColor: '#E9D2B3',
    },
    header: {
        color: "#D76B49",
        textAlign: 'center',
        fontSize: 40,
        textShadowRadius: 20,
        fontWeight: "bold",
        marginBottom: 5,

    }
});

export default IndexWalletScreen;
