import React from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native'

const CheckBox = ({data, onSubmit})=>{
    return(
        <FlatList
                center
                horizontal={true}
                data={data}
                keyExtractor = {item=> item.type}
                renderItem={({item})=>{
                    return <CheckBox
                        center
                        size={8}
                        title={item.type}
                        value={item.status}
                        onIconPress={onSubmit}

                    />
                }}
            />
    );
};

const styles = StyleSheet.create({});

export default CheckBox;
