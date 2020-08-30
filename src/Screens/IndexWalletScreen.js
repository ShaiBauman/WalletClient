import React, {useContext, useEffect} from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import  {StyleSheet} from 'react-native';
import {Context as UserContext} from "../context/UserContext";
import ProgressChart from "react-native-chart-kit/src/progress-chart";
import {Text} from "react-native-elements";
import {Context as StatisticsContext} from "../context/StatisticsContext";

const IndexWalletScreen = ()=>{

    useEffect(()=>{
        getPasses(user_state.myUser.email);
        MonthlyBalance(user_state.myUser.email)
        MoneyISaved(user_state.myUser.email)
        expenseByCategory(user_state.myUser.email)
    },[]);


    const user_state = useContext(UserContext).state
    const {getPasses} = useContext(UserContext);
    const {state, MonthlyBalance, MoneyISaved, expenseByCategory} = useContext(StatisticsContext)

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />


    let stats= []
    stats.push(<Text style={styles.text1}>
            My monthly cash flow

        </Text>
    )
    stats.push(<Text style={styles.text2}>
        {state.MonthlyBalance}
    </Text>)
    stats.push( <Text style={styles.text1} >
            I saved this month
        </Text>
    )
    stats.push( <Text style={styles.text2} >
            {state.MoneyISaved} ₪
        </Text>
    )



    return(
        <Card>
            <Card.Title title={user_state.myUser.firstName+' '+user_state.myUser.lastName} subtitle={'email: '+user_state.myUser.email} left={LeftContent} />
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title style={{textAlign:"center", marginTop:30 }}>My Target</Title>
                <Paragraph style={{textAlign:"center"}}>{user_state.myUser.myTarget}</Paragraph>
                <Title style={{textAlign:"center", marginTop:20}}>My Passes</Title>
                <Paragraph style={{textAlign:"center"}}>{user_state.passes}</Paragraph>
                {stats}
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

    },
    text1:{
        textAlign:"center",
        marginTop:15,
        fontSize: 18,
        fontWeight: "bold"
    },
    text2:{
        textAlign:"center",
        marginTop:20
    }
});

export default IndexWalletScreen;
