import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList,TouchableOpacity, TextInput} from 'react-native'
import {Text, Button, CheckBox, Avatar} from "react-native-elements";
import {Context as UserContext} from "../context/UserContext";
import DropDownForm from "../components/DropDownForm";
import {NavigationEvents} from "react-navigation";

const RegistrationScreen = ({navigation})=>{

    const {state, addUser, clearErrorMessage, navigateAccordingKindOfUser} = useContext(UserContext);

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
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCorrect={false}
                    selectionColor={"red"}
                    style={styles.inputStyle}
                    placeholderTextColor={"#2F4730"}
                    contextMenuHidden={true}
                />
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
        </View>
          <TouchableOpacity
                title="Sign Up"
                onPress={()=>{
                    addUser(firstName,lastName,phoneNumber,email,password,confirmPassword);
                    navigateAccordingKindOfUser(userType);
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
        backgroundColor:'#CEB386',
        borderColor:'#CEB386',
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
        marginTop:0,
        marginBottom: 0
    },
    inputStyle:{height: 30,fontSize:16, marginRight:23,marginLeft:10,marginBottom:10,borderBottomWidth:0.3,borderColor:'black'},
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
        borderColor: '#80B28B',
        borderWidth:3,
        paddingVertical:10,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        borderRadius:8,
        fontSize: 18,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:0,
        marginLeft: 8,
        marginTop:0,
        marginRight:8,

    },
    errorMessage:{color: 'red', textAlign:'center',marginTop:10}


});

export default RegistrationScreen;
