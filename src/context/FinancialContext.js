import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const financialReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_credit_card':
            return {errorMessage: 'This is invalid credit card', id: action.payload};
        default:
            return state;
    }
};

const navigateAccordingKindOfUser = (userType) =>{
    if(userType === 'both') //the user is a wallet and a friend
    {
        dispatch({type: 'add_type_wallet'});
        dispatch({type: 'add_type_friend'});
        navigate('Profile');
    }
    else if(userType === 'wallet') //the user is a wallet
    {
        dispatch({type: 'add_type_wallet'});
        navigate('Profile');
    }
    else //the user is a friend
    {
        dispatch({type: 'add_type_friend'});
        navigate('indexMember');
    }

};
/*
const login = dispatch => async ({email, password, confirmPassword}) =>{

};
const logOut = dispatch=> ()=>{

};

const passwordRecovery = dispatch=> ()=>{

};
*/
/*id:'', firstName:'',lastName:'',phoneNumber:'',email:'',password:'',answerPassword:'',
    target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], addictedStatus:0,
    avgExpensesLastThreeMonths:0, avgExpenses:0, dateOfBirth:'', maritalStatus:'',
    walletMember: false, friendMember: false,
    passes:0,
*/


const addCreditCard = dispatch =>async (cardNumber, valid,cvc,companyName)=>{

    try {
        const response = await serverApi.post('/financial/creditCard', {userId,cardNumber,valid,cvc,companyName});

        dispatch({type: 'add_credit_card', payload: ''/*response.data.id*/});
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with registration'});

    }
};

export const {Provider, Context} = createDataContext(
    financialReducer,
    {  addCreditCard /*, updateUser */},
    {
        id:'', firstName:'',lastName:'',phoneNumber:'',email:'',password:'',answerPassword:'',
        target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], addictedStatus:0,
        avgExpensesLastThreeMonths:0, dateOfBirth:'', maritalStatus:'',
        walletMember: false, friendMember: false,
        passes:0,
        errorMessage:''
    }
);
