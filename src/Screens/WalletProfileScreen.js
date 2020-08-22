import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {Text, Input,  Slider} from "react-native-elements";
import DropDownForm from "../components/DropDownForm";
import {Context as UserContext} from "../context/UserContext";
import DialogForm from "../components/DialogForm";
import {Portal, Provider} from "react-native-paper";


const WalletProfileScreen = (navigation)=>{

    console.disableYellowBox = true;

    const {state, updateUser } = useContext(UserContext);


    let maritalStatusState =[     //    Bachelor = 0,Married=1, Divorcee=2, Widower=3
        {value: "Bachelor"},{value: "Married"}, {value:"Divorcee"},{value:"Widower"}];

    const [target, setTarget] = useState(0);
    const [avgExpensesLastThreeMonths, setAvgExpensesLastThreeMonths] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [addictedStatus, setAddictedStatus] = useState(addictedStatus);
    const [fixedIncomes, setFixedIncomes] = useState(state.myUser.myFixedIncomes);
    const [fixedExpenses, setFixedExpenses] = useState(state.myUser.myFixedExpenses);


const AddItem = (item, item2, setFunc) =>{

    setFunc(item.concat(setFunc));
}


    console.log(maritalStatus);
    console.log(fixedExpenses);

    return(
        <Provider>
            <Portal>
        <View style={styles.container}>
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
                <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={styles.inputStyle}
                placeholder="Average Expenses"
                value={avgExpensesLastThreeMonths }
                onChangeText={avgExpensesLastThreeMonths}
                keyboardType = 'numeric'
            />

                <Text style={styles.textStyle}>Insert Your Monthly Target</Text>
                <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType = 'numeric'
                inputStyle={styles.inputStyle}
                placeholder="Monthly Target"
                value={target}
                baseColor={"#2F4730"}
                onChangeText={setTarget}
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
            </ScrollView>

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
                    console.log(maritalStatusScore)

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
                       console.log(walletMemberDto)
                    updateUser(walletMemberDto)
                   }}
            >
                <Text style={styles.buttonGoOn}>{"Go On!"}</Text>
            </TouchableOpacity>

        </View>
            </Portal>
        </Provider>
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
    buttonContainer: {
        flex: 1,
        marginLeft:20,
        marginRight:10,
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
        textAlign: "center",
        alignItems: "center",
        borderColor: '#2F4730',

    },
    button: {
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
        overflow: 'hidden',

    },
    buttonGoOn: {
        textAlign: "center",
        borderColor: '#80B28B',
        borderWidth:3,
        justifyContent: 'space-between',
        paddingVertical:20,
        paddingLeft:12,
        backgroundColor:'#2F4730',
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',
        color: '#80B28B',
        marginBottom:60,
        marginLeft: 8,
        marginTop:0,
        marginRight:8,
    }
});

export default WalletProfileScreen;
