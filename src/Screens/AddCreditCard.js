import React, { useState } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

const AddCreditCard = ({navigation})=>{
    const [isValid, setIsValid] = useState(false);
    const _saveCreditCard = function () {
        // TODO: Add credit card to db
        navigation.goBack();
    };
    this.data = {};

    this._onChange = (form)=> {
        setIsValid(form.valid);
        if (form.valid) {
            this.values = form.values;
        }
    };

    return(
        <View style={styles.container}>
            <Text style={{fontSize:24}}>Add Credit Card</Text>
            <CreditCardInput onChange={this._onChange} />
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
