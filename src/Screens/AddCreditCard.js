import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import {Context as UserContext} from "../context/UserContext";
import {Context as FinancialContext} from "../context/FinancialContext";

const AddCreditCard = ({navigation})=>{

    const userState = useContext(UserContext).state;
    const financial_state = useContext(FinancialContext).state;
    const {addCreditCard, getLastDigitsCreditCard} = useContext(FinancialContext);

    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        getLastDigitsCreditCard(userState.id);
    }, []);


    const _onChange = (form)=> {
        setIsValid(form.valid);
        if (form.valid) {
            setData(form.values);
        }
    };

    const _saveCreditCard = function (data) {
        addCreditCard(userState.id, data.number, data.expiry, data.cvc, data.type);
        navigation.goBack();
    };

    let lastDigitsText =<Text></Text>;

    if (financial_state.lastDigits) {
        lastDigitsText = <Text style={{fontSize: 18}}>Your saved credit card ends in {financial_state.lastDigits}</Text>
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize:24}}>Add Credit Card</Text>
            {lastDigitsText}

            <CreditCardInput onChange={_onChange} />
            <Button   title="Save"
                      color="#841584"
                      disabled={!isValid}
                      onPress={()=>_saveCreditCard(data)}/>

        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        margin:10,
        direction: 'ltr',
        textAlign: "left"
    }
});

export default AddCreditCard;
