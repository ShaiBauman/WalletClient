import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native'
import FriendForm from "../components/FriendForm";
import {Context as UserContext} from "../context/UserContext";

const FriendsScreen = ()=>{

    console.disableYellowBox = true;

    const {state, addFriend} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [friends, setFriends] = useState(state.myFriends);

console.log(JSON.stringify(friends))


    return(

        <View style={styles.container}>
       <View>
        <Text style={styles.header}>My Friends</Text>

            <TextInput
                autoCapitalize="none"
                textContentType='email'
                placefholder="Insert Email Of Friend "
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                selectionColor={"black"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
            />
            <TouchableOpacity
                title="Add Friend"
                onPress={()=>{
                    addFriend(state.id,email);
                    setFriends(state.myFriends)
                    setEmail('');
            }}
            >
                <Text style={styles.button}>{"Add Friend"}</Text>
            </TouchableOpacity>
       </View>
           <ScrollView>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    keyExtractor = {friend=> friend}
                    data = {friends}
                    renderItem={({item}) =>{
                        console.log("friend" + JSON.stringify(item))
                        return(  <FriendForm
                            friend={item}
                        />)
                    }}
                />

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#CEB386',
        borderColor:'#CEB386',
        flex:1
    },
    header:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: 'bold'
    },
    button:{
        textAlign: "center",
        borderColor: '#2F4730',
        borderWidth:3,
        paddingVertical:6,
        paddingHorizontal:50,
        backgroundColor:'#80B28B',
        marginRight:20,
        marginLeft: 14,
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputStyle:{
        height: 30,
        fontSize:12,
        marginRight:23,
        marginLeft:15,
        marginBottom:10,
        marginTop:10,
        borderBottomWidth:0.3,
        borderColor:'black',
        borderWidth: 1,
        textAlign: "center",
        alignItems: "center",

    },
});

export default FriendsScreen;
