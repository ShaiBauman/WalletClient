import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import {Context as UserContext} from "../context/UserContext";
import {Context as FinancialContext} from "../context/FinancialContext";

const AddCreditCard = ({navigation})=>{

    const userState = useContext(UserContext).state;
    const {addCreditCard, getLastDigitsCreditCard} = useContext(FinancialContext);

    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState({});
    const [lastDigits, setLastDigits ] = useState('');

    if(!lastDigits) {
        getLastDigitsCreditCard(userState.id).then(data => setLastDigits(data));
    }

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
    if (lastDigits) {
        lastDigitsText = <Text style={{fontSize: 18}}>Your saved credit card ends in {lastDigits}</Text>
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
