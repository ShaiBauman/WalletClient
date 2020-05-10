import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native'
import {Context as UserContext} from "../context/UserContext";
import DatePicker from "react-native-datepicker";

const DateForm = (data, onSubmit)=>{

    return(
        <DatePicker
            style={{width: 200}}
            date={data} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Select Your Birth Date"
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
            }}
            onDateChange={onSubmit}
        />
    );
};

const styles = StyleSheet.create({});

export default DateForm;
