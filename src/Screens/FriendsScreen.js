import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native'
import FriendForm from "../components/FriendForm";
import {Context as UserContext} from "../context/UserContext";

const FriendsScreen = ()=>{

    console.disableYellowBox = true;

    const {state, addFriend} = useContext(UserContext);


    const flag = false;


    const [email, setEmail] = useState('');
    const [friends, setFriends] = useState(state.myUser.myWalletMembers);




    return(

        <View style={styles.container}>
            <Text style={styles.header}>My Friends</Text>

            <TextInput
                autoCapitalize="none"
                textContentType='email'
                placeholder="Insert Email Of Friend "
                value={email}
                onChangeText={setEmail}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
            />
            <TouchableOpacity
                title="Add Friend"
                onPress={()=>{
                    addFriend(state.id,email);
                    setFriends(state.myUser.myWalletMembers)
                    setEmail('');
            }}
            >
                <Text style={styles.button}>{"Add Friend"}</Text>
            </TouchableOpacity>
            <ScrollView>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor = {friend=> friend.id}
                    data = {friends}
                    renderItem={({item}) =>{
                        return  <FriendForm
                            friend={item}
                        />
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
        alignItems: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth:3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        paddingLeft:18,
        backgroundColor:'#80B28B',
        marginRight:12,
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden'
    },
    inputStyle:{
        height: 30,
        fontSize:12,
        marginRight:23,
        marginLeft:10,
        marginBottom:10,
        borderBottomWidth:0.3,
        borderColor:'black',
        textAlign: 'center'
    },
});

export default FriendsScreen;
