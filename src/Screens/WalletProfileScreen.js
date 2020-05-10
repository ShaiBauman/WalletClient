import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native'
import {Text, Input, Button, Slider} from "react-native-elements";
import Spacer from "../components/Spacer";
import CheckBoxForm from "../components/CheckBoxForm";
import DateForm from "../components/DateForm";
import {Context as UserContext} from "../context/UserContext";


const WalletProfileScreen = ()=>{

    const {state, updateUser } = useContext(UserContext);

    const fixedIncomesState=[];
    const fixedExpensesState=[];
    const maritalStatusState =[
    {type: 'Bachelor', status: false},
    {type: 'Married', status: false},
    {type: 'Divorcee', status: false},
    {type: 'Widower', status: false},
];

    const [target, setTarget] = useState(0);
    const [avgExpensesLastThreeMonths, setAvgExpensesLastThreeMonths] = useState(0);
    const [dateOfBirth, setDateOfBirth] = useState("01-01-1900");
    const [maritalStatus, setMaritalStatus] = useState('');
    const [addictedStatus, setAddictedStatus] = useState(addictedStatus);
    const [fixedIncomes, setFixedIncomes] = useState(fixedIncomesState);
    const [fixedExpenses, setFixedExpenses] = useState(fixedExpenses);

    console.log(state);

    return(
        <View>
            <Text style={{fontSize:30}}>My Profile</Text>
            <ScrollView>
            <Spacer>
                <Text>How addicted are you ??</Text>
            <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                title={"How addicted are you ??"}
                value={addictedStatus}
                onValueChange={slideValue => setAddictedStatus(slideValue)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
            />
                <Text style={styles.textStyle}>Insert Your Average Expenses for Last Three Months</Text>
                <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Average Expenses"
                value={avgExpensesLastThreeMonths }
                onChangeText={avgExpensesLastThreeMonths}
            />

                <Text>Insert Your Monthly Target</Text>
                <Input
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Monthly Target"
                value={target}
                onChangeText={setTarget}
            />
            </Spacer>
            <Spacer>
                <Text>Select Your Birth Date</Text>
            <DateForm
                data={dateOfBirth}
                onSubmit={setDateOfBirth}
            />
            </Spacer>
            <Spacer>
                <Text>Select your Marital Status</Text>
                <CheckBoxForm
                    data={maritalStatusState}
                onSubmit={setMaritalStatus}
                />
            </Spacer>
            <Spacer>
        <Button
            title="Add Fixed Expenses "
            type="outline"
            onPress={setFixedExpenses}
        />
            <Button
                title="Add Fixed Incomes "
                type="outline"
                onPress={setFixedIncomes}
            />
            </Spacer>
            </ScrollView>
            <Button
                title="Go On!"
                onPress={()=>updateUser(addictedStatus, avgExpensesLastThreeMonths, avgExpenses, target,
                    dateOfBirth, maritalStatus, fixedIncomes, fixedExpenses)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle:{

    },
    textStyle:{
      fontSize: 12,
        alignItems: 'center'
    },
    dateIcon: {
        position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
    },
    dateInput: {
        marginLeft: 36
    }
});

export default WalletProfileScreen;
