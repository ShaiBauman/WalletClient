import React from "react";
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {Dropdown}  from 'react-native-material-dropdown-v2';


const DropDownForm = ({data, onSubmit,title})=>{

/*    const state = {
        value: null
    };

    const handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }*/
    return(
        <Dropdown
            label={title}
            data={data}
            baseColor={"#2F4730"}
            onChangeText={onSubmit}
            containerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container:{
        width:327,
        justifyContent: 'center',
        marginLeft:10,
        marginRight:10,
    }
});

export default DropDownForm;
