import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import {Context as UserContext} from "../context/UserContext";
import {Context as FinancialContext} from "../context/FinancialContext";

const AddCreditCard = ({navigation})=>{

    const {state} = useContext(UserContext);
    const {addCreditCard} = useContext(FinancialContext);

    const [isValid, setIsValid] = useState(false);
    const [data, setData] = useState({});

    const _onChange = (form)=> {
        setIsValid(form.valid);
        if (form.valid) {
            setData(form.values);
        }
    };

    const _saveCreditCard = function (data) {
        addCreditCard(state.id, data.number, data.expiry, data.cvc, data.type);
        navigation.goBack();
    };

    return(
        <View style={styles.container}>
            <Text style={{fontSize:24}}>Add Credit Card</Text>
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
