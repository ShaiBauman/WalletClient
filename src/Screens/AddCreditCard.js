import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import {Context as UserContext} from "../context/UserContext";
import {Context as FinancialContext} from "../context/FinancialContext";

const AddCreditCard = ({navigation})=>{
    console.log(FinancialContext);
    console.log(UserContext);
    const {state: {_id,id}} = useContext(UserContext);
    const {addCreditCard} = useContext(FinancialContext);
    console.log("id: " + id);
    console.log("_id: " + _id);

    const [isValid, setIsValid] = useState(false);

    const data = {};

    const _onChange = (form)=> {
        setIsValid(form.valid);
        if (form.valid) {
            console.log(form.values);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={{fontSize:24}}>Add Credit Card</Text>
            <CreditCardInput onChange={_onChange} />
            <Button   title="Save"
                      color="#841584"
                      disabled={!isValid}
                      onPress={_saveCreditCard}/>

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
