import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native'
import {Text, Input, Button, CheckBox, Avatar} from "react-native-elements";
import {Context as UserContext} from "../context/UserContext";

const RegistrationScreen = ()=>{

    const {addUser, addUserPhoto} = useContext(UserContext);

    const userTypeState = [
        {type: 'wallet', status: false},
        {type: 'friend', status: false},
        {type: 'both', status: false}
    ];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState(userTypeState);


    const state={
    wallet: false,
    friend: false,
    both: false
    };

    const pressOn = (item)=> {
        switch (item) {
            case (item === 'wallet'): {
                userTypeState[0].status(true);
                setState({wallet: true, friend: false, both: false});
                setUserType(userTypeState);
                console.log(userType);
            }
            case (item === 'friend'): {
                userTypeState[1].status(true);
                setState({wallet: false, friend: true, both: false});
                setUserType(userTypeState);
                console.log(userType);
            }
            case (item === 'both'): {
                userTypeState[2].status(true);
                setState({wallet: false, friend: false, both: true});
                setUserType(userTypeState);
                console.log(userType);
            }
        }
    };
    return(
    <View>
            <Text style={{fontSize:40}}>Registration Screen</Text>
          <FlatList
              center
            horizontal={true}
            data={userType}
            keyExtractor = {item=> item.type}
                  renderItem={({item})=>{
         return <CheckBox
                center
                size={16}
                title={item.type}
                value={item.status}
                onIconPress={(item)=>pressOn(item.status)}

            />
        }}
       />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
             />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
           />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Button
                title="Sign Up"
                onPress={()=>{addUser(firstName,lastName,phoneNumber,email,password,confirmPassword), addUserPhoto()}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle:{
       flex:1,
        fontSize:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20

    },
    pictureStyle:{
        alignItems: 'center'

    }
});

export default RegistrationScreen;
