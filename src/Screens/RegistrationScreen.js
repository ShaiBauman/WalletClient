import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {Text} from "react-native-elements";
import {Context as UserContext} from "../context/UserContext";
import DropDownForm from "../components/DropDownForm";
import {NavigationEvents} from "react-navigation";

const RegistrationScreen = ({navigation})=>{

    console.disableYellowBox = true;


    const {state, RegisterNewUser, clearErrorMessage} = useContext(UserContext);

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
    const [answerPassword, setAnswerPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');

    return(
    <View style={styles.container}>
            <Text style={styles.title}>Registration</Text>
        <Text style={styles.subtitle}>Insert your details, please...</Text>
        <View>
            <DropDownForm
                data={userTypeState}
                title={"Select User Type"}
                onSubmit={setUserType}
            />
                <TextInput
                    autoCapitalize="none"
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCorrect={false}
                    selectionColor={"red"}
                    style={styles.inputStyle}
                    placeholderTextColor={"#2F4730"}
                    contextMenuHidden={true}

                  />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    autoCorrect={false}
                    selectionColor={"red"}
                    style={styles.inputStyle}
                    placeholderTextColor={"#2F4730"}
                    contextMenuHidden={true}
                />
                <TextInput
                    autoCapitalize="none"
                    textContentType='email'
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    selectionColor={"red"}
                    style={styles.inputStyle}
                    placeholderTextColor={"#2F4730"}
                    contextMenuHidden={true}
                 />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    selectionColor={"red"}
                    style={styles.inputStyle}
                    placeholderTextColor={"#2F4730"}
                    contextMenuHidden={true}
               />
            <TextInput
                autoCapitalize="none"
                placeholder="Password Recovery - Insert Your Favorite Lecturer Name"
                value={answerPassword}
                onChangeText={setAnswerPassword}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
            />
            <TextInput
                autoCapitalize="none"
                placeholder="Phone Number"
                autoCompleteType='tel'
                keyboardType = 'numeric'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
            />
            <TextInput
                autoCapitalize="none"
                placeholder="Year of Birth"
                value={yearOfBirth}
                onChangeText={setYearOfBirth}
                autoCorrect={false}
                selectionColor={"red"}
                style={styles.inputStyle}
                placeholderTextColor={"#2F4730"}
                contextMenuHidden={true}
                keyboardType = 'numeric'
            />
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
        </View>
          <TouchableOpacity
                title="Sign Up"
                onPress={()=>{
                    let myUserType = true;
                    if(userType === 'friend') //the user is friend
                    {
                        myUserType = false;
                    }

                    let userDto = {
                        "firstName":firstName,
                        "lastName":lastName,
                        "email":email,
                        "password":password,
                        "answerPassword":answerPassword,
                        "phoneNumber":phoneNumber,
                        "yearOfBirth":yearOfBirth,
                        "walletMember":myUserType
                    }
        RegisterNewUser(userDto);
                }}
                >
               <Text style={styles.buttonSingUp}>{"Sign up"}</Text>
          </TouchableOpacity>
        {state.errorMessage ?
            (<Text style={styles.errorMessage}>{state.errorMessage}</Text>)
            :null}
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
        marginBottom:0
    },
    subtitle:{
        fontSize:20,
        textAlign: "center",
        borderColor: 'black',
    },
    container:{
        flex: 1,
        margin:0,
        backgroundColor:'#E9D2B3',
        borderColor:'#E9D2B3',
    },

    header:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: 'bold'
    },
    buttonContainer: {
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
        marginBottom: 0
    },
    inputStyle:{
       height: 30,
        fontSize:12,
        marginRight:23,
        marginLeft:10,
        marginBottom:10,
        borderBottomWidth:0.3,
        borderColor:'black'},
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
        marginTop:5,
        borderRadius:8,
        fontSize: 10,
        fontWeight: 'bold',
        overflow: 'hidden',

    },
    buttonSingUp: {
        textAlign: "center",
        paddingVertical:10,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:0,
        marginLeft: 8,
        marginTop:30,
        marginRight:8,

    },
    errorMessage:{color: 'red', textAlign:'center',marginTop:10}


});

export default RegistrationScreen;
