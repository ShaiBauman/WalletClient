import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Menu, Divider} from 'react-native-paper';
import {FontAwesome} from "@expo/vector-icons";
import {Context as UserContext} from "../context/UserContext";

const MyMenu = ({navigation, children})=>{

    const [visible,setVisible] = useState( false );
    const {state, signOut} = useContext(UserContext);


    return (


            <View style={{height:30}}>

                <Menu
                    visible={visible}
                    onDismiss={()=>setVisible(false)}
                    statusBarHeight={0}
                    anchor={
                        <TouchableOpacity onPress={()=>{setVisible(true)}}>
                            <FontAwesome name="bars" size={32} color="black" style={{margin:5}} />
                        </TouchableOpacity>
                        }
                    >

                    <Menu.Item icon="wall" onPress={() => {}} title="Menu" disabled={false} />
                    <Divider />
                    <Menu.Item onPress={() => {navigation.navigate('Profile')}} title="Update Profile" />
                    <Menu.Item onPress={() => {navigation.navigate('Settings')}} title="Settings" />
                    <Menu.Item onPress={() => {navigation.navigate('indexFriend')}} title="Change to Friend"  />
                    <Menu.Item onPress={() => {navigation.navigate('addCreditCard')}} title="Edit credit card" />
                    <Divider />
                    <Menu.Item onPress={signOut} title="Log Out" />

                </Menu>
               </View>


    );
};

const styles = StyleSheet.create({});

export default MyMenu;
