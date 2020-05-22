import React, {Component, useContext, useState} from 'react';
import DatePicker from "react-native-datepicker";

const DateForm = ({onSubmit}) =>{

     let date ='1920-01-01';

        return (
            <DatePicker
                style={{width: 328, marginLeft: 10}}
                date={date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1920-01-01"
                maxDate="2020-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 80
                    },
                    dateInput: {
                        alignItems: 'center'
                    }

                }}
                onDateChange={(date) => {onSubmit(date)}}
            />
        )
    };

export default DateForm;
