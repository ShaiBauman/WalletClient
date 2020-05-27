import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import {FontAwesome} from "@expo/vector-icons";
import { NavigationActions } from 'react-navigation';

const Menu = ()=>{

    const [visible,setVisible] = useState( false );


    return (
        <Provider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                <Menu
                    visible={visible}
                    onDismiss={setVisible(false)}
                    anchor={
                        <TouchableOpacity onPress={()=>{}}>
                            <FontAwesome name="bars" size={32} color="black" style={{margin:5}} />
                        </TouchableOpacity>
                        }
                    >
                    <Menu.Item onPress={() => {navigation.navigate('Profile')}} title="Update Profile" />
                    <Menu.Item onPress={() => {navigation.navigate('Settings')}} title="Settings" />
                    <Menu.Item onPress={() => {navigation.navigate('indexFriend')}} title="Change to Friend" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Log Out" />
                </Menu>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({});

export default Menu;
