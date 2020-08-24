import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import {Text, Slider} from "react-native-elements";
import DropDownForm from "../components/DropDownForm";
import {Context as UserContext} from "../context/UserContext";
import DialogForm from "../components/DialogForm";
import {Portal, Provider} from "react-native-paper";
import Spacer from "../components/Spacer";


const WalletProfileScreen = (navigation)=>{

    console.disableYellowBox = true;



    const {state, updateUser } = useContext(UserContext);


    let maritalStatusState =[     //    Bachelor = 0,Married=1, Divorcee=2, Widower=3
        {value: "Single"},{value: "Married"}, {value:"Divorcee"},{value:"Widower"}];

    const [target, setTarget] = useState(state.myUser.target);
    const [avgExpensesLastThreeMonths, setAvgExpensesLastThreeMonths] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState(state.myUser.maritalStatus);
    const [addictedStatus, setAddictedStatus] = useState(state.myUser.addictedStatus);
    const [fixedIncomes, setFixedIncomes] = useState(state.myUser.myFixedIncomes);
    const [fixedExpenses, setFixedExpenses] = useState(state.myUser.myFixedExpenses);


const AddItem = (item, item2, setFunc) =>{

    setFunc(item.concat(setFunc));
}

    return(
        <Provider>
            <Portal>
        <View style={styles.container}>
            <Spacer><Spacer><Spacer></Spacer></Spacer></Spacer>
            <Text style={styles.header}>My Profile</Text>
            <ScrollView>

                <Text style={styles.textStyle}>How addicted are you ??</Text>
            <Slider
                step={1}
                minimumValue={0}
                maximumValue={10}
                title={"How addicted are you ??"}
                value={addictedStatus}
                onValueChange={slideValue => setAddictedStatus(slideValue)}
                minimumTrackTintColor="#2F4730"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#80B28B"
                style={{marginLeft:10, marginRight:10}}
            />
                <Text style={styles.textStyle}>Insert Your Average Expenses for Last Three Months</Text>
                <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="Average Expenses"
                value={avgExpensesLastThreeMonths }
                onChangeText={avgExpensesLastThreeMonths}
                keyboardType = 'numeric'
                placeholderTextColor={"#2F4730"}
                />

                <Text style={styles.textStyle}>Insert Your Monthly Target</Text>
                <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType = 'numeric'
                inputStyle={styles.inputStyle}
                placeholder="Monthly Target"
                value={target}
                baseColor={"#2F4730"}
                onChangeText={setTarget}
                bordered={true}
                placeholderTextColor={"#2F4730"}

                />

             <Text style={styles.textStyle}>Select Your Marital Status</Text>
                <DropDownForm
                data={maritalStatusState}
                title={"Marital Status"}
                onSubmit={setMaritalStatus}
                />

                <DialogForm
                    title={"Edit Fixed Expenses"}
                    setFunc={setFixedExpenses}
                    myList={fixedExpenses}
                />
                <DialogForm
                    title={"Edit Fixed Income"}
                    setFunc={setFixedIncomes}
                    myList={fixedIncomes}
                />


            <TouchableOpacity
                onPress={()=> {
                    let maritalStatusScore = 0
                       if(maritalStatus ==='Bachelor')
                            maritalStatusScore=0
                       else if(maritalStatus ==='Married')
                            maritalStatusScore=1
                       else if(maritalStatus ==='Divorcee')
                            maritalStatusScore=2
                       else //'Widower'
                            maritalStatusScore =3

                    const walletMemberDto={
                           "id": state.id,
                        "maritalStatus":maritalStatusScore,
                        "addictedStatus":addictedStatus,
                        "myTarget":target,
                        "walletMember": true,
                        "myWalletMembers":[],
                        "myFixedExpenses":fixedExpenses,
                        "myFixedIncomes":fixedIncomes,
                        "passes":addictedStatus
                    }
                    updateUser(walletMemberDto)
                   }}
            >
                <Text style={styles.buttonGoOn}>{"Go On!"}</Text>
            </TouchableOpacity>
                <Spacer></Spacer>
            </ScrollView>
        </View>
            </Portal>
        </Provider>
    );
};


WalletProfileScreen.navigationOptions =()=> {
    return {
        header: null
    };
};




const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E9D2B3',
        borderColor:'#E9D2B3',
        flex:1,
        borderWidth: 10
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
        backgroundColor: '#CEB386'
    },
    textStyle:{
      fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 0
    },
    inputStyle:{
        height: 50,
        fontSize:18,
        marginRight:12,
        marginLeft:12,
        marginBottom:0,
        marginTop:15,
        borderWidth:0.8,
        borderColor:'black',
        textAlign: "center",
    },
    buttonGoOn: {
        textAlign: "center",
        justifyContent: 'space-between',
        paddingVertical:20,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:60,
        marginLeft: 12,
        marginTop:10,
        marginRight:12,
    }
});

export default WalletProfileScreen;
