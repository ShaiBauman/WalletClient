import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import FriendForm from "../components/FriendForm";

const FriendsScreen = ()=>{

    const friends = [];


    return(

        <View style={styles.container}>
            <Text style={styles.header}>My Friends</Text>
            <ScrollView>
            <FriendForm
                friendArray={friends}
            />
            <FriendForm
                friendArray={friends}
            />
            <FriendForm
                friendArray={friends}
            />
            <FriendForm
                friendArray={friends}
            />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin:10
    },
    header:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: 'bold'
    },
});

export default FriendsScreen;
