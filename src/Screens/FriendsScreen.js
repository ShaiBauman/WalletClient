import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import FriendForm from "../components/FriendForm";
import {Context as UserContext} from "../context/UserContext";

const FriendsScreen = ()=>{

    const {state: {myWalletMembers}, addFriend, navigateAccordingKindOfUser} = useContext(UserContext);

    //maybe just send mail with link ???

    const friends = myWalletMembers;


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    return(

        <View style={styles.container}>
            <Text style={styles.header}>My Friends</Text>
            <TouchableOpacity
                title="Add Friend"
                onPress={()=>{
                    addFriend(firstName,lastName,phoneNumber,email,password,confirmPassword);
                    navigateAccordingKindOfUser('friend');
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
                            friendArray={item}
                        />
                    }}
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
    button:{

    }
});

export default FriendsScreen;
