import React from 'react';
import {View, StyleSheet, Text} from 'react-native'

const Spacer = ({children})=>{
    return(
        <View style={styles.spacer}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    spacer:{
        margin:10
    }
});

export default Spacer;
