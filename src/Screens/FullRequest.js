import React, {useContext, useEffect} from 'react';
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import {Button} from "react-native";

const FullRequest = ({ navigation }) => {
    const req = navigation.getParam('req');
    return (
        <Container>
            <Text>
                {req.category}
            </Text>
            <Button title="Use Bot!" onPress={() => {
                navigation.navigate("Generator", {'req': req})
            }}/>
        </Container>
    )
}

export default FullRequest
