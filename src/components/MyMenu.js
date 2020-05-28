import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Button, Paragraph, Menu, Divider, Provider, Portal, Modal} from 'react-native-paper';
import {FontAwesome} from "@expo/vector-icons";
import { NavigationActions } from 'react-navigation';

const MyMenu = ({navigation, children})=>{

    const [visible,setVisible] = useState( false );


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
                    <Menu.Item onPress={() => {return navigation.navigate('Profile')}} title="Update Profile" />
                    <Menu.Item onPress={() => {navigation.navigate('Settings')}} title="Settings" />
                    <Menu.Item onPress={() => {navigation.navigate('indexFriend')}} title="Change to Friend" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Log Out" />

                </Menu>
               </View>


    );
};

const styles = StyleSheet.create({});

export default MyMenu;
