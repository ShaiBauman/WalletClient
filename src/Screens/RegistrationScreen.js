import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList,TouchableOpacity} from 'react-native'
import {Text, Input, Button, CheckBox, Avatar} from "react-native-elements";
import {Context as UserContext} from "../context/UserContext";
import DropDownForm from "../components/DropDownForm";
import Spacer from "../components/Spacer";
import ScrollView from "react-native-web/dist/exports/ScrollView";

const RegistrationScreen = ()=>{

    const {addUser, addUserPhoto} = useContext(UserContext);

    const userTypeState = [
        {value: 'wallet'},
        {value: 'friend'},
        {value: 'both'}
    ];


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');


    return(
    <View style={styles.container}>
            <Text style={styles.title}>Registration Screen</Text>
        <Text style={styles.subtitle}>Insert your details, please...</Text>

        <DropDownForm
            data={userTypeState}
            title={"Select User Type"}
            onSubmit={setUserType}
        />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="Phone Number"
                keyboardType = 'numeric'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                dataDetectorType='email'
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
             />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
           />
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

           <TouchableOpacity
                title="Sign Up"
                onPress={()=>{addUser(firstName,lastName,phoneNumber,email,password,confirmPassword, userType), addUserPhoto}}
                >
               <Text style={styles.buttonSingUp}>{"Sign up"}</Text>
          </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

   pictureStyle:{
        alignItems: 'center'

    },
    title:{
    fontSize:35,
        textAlign: "center",
        borderColor: 'black',
        marginBottom:10
    },
    subtitle:{
        fontSize:20,
        textAlign: "center",
        borderColor: 'black',
    },
    container:{
        flex: 1,
        margin:0,
        backgroundColor:'#CEB386',
        borderColor:'#CEB386',
    },

    header:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: 'bold'
    },
    buttonContainer: {
        flex: 1,
        marginLeft:20,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CEB386'
    },
    textStyle:{
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 4,
        marginBottom: 4
    },
    inputStyle:{
        textAlign: "center",
        alignItems: "center",
        borderColor: '#2F4730',


    },
    button: {
        alignItems: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth:3,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        paddingLeft:18,
        backgroundColor:'#80B28B',
        marginRight:12,
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',

    },
    buttonSingUp: {
        textAlign: "center",
        padding: 10,
        borderColor: '#80B28B',
        borderWidth:3,
        flex:10,
        paddingVertical:10,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        borderRadius:8,
        fontSize: 10,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:0,
        marginLeft: 8,
        marginTop:0,
        marginRight:8,
        justifyContent:'center'
    }

});

export default RegistrationScreen;
