import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';

const ChooseCreditCard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    {key: '....1234'},
                    {key: '....2345'},
                    {key: '....2325'}
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
            <Button title="Add new credit card"
                    onPress={() => navigation.navigate('addCreditCard')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default ChooseCreditCard;
