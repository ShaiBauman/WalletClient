import React from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import PickerCheckBox from 'react-native-picker-checkbox';


const CheckBoxForm = ({data, onSubmit})=>{


   const handleConfirm = (pItems)=> {
       pItems.status = true;
       onSubmit(data);
   }


    return(
        <PickerCheckBox
            data={data}
            headerComponent={<Text style={{fontSize:25}} >items</Text>}
            OnConfirm={(pItems) => handleConfirm(pItems)}
            ConfirmButtonTitle='OK'
            DescriptionField={item=>item.type}
            KeyField='itemKey'
            placeholder='select your status'
            arrowColor='#FFD740'
            arrowSize={6}
            placeholderSelectedItems ='$count selected item(s)'
        />
    );
};

const styles = StyleSheet.create({});

export default CheckBoxForm;
