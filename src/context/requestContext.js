import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const requestReducer = (state, action)=>{
    switch(action.type)
    {
     /*   case 'add_user':
            return {errorMessage: '', id: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'add_type_wallet':
            return {...state, walletMember: true};
        case 'add_type_friend':
            return {...state, friendMember: true};
        case 'add_firstName':
            return{...state, firstName: action.payload};
        case 'add_lastName':
            return{...state, lastName: action.payload};
        case 'add_target':
            return{...state, target: action.payload};
        case 'add_fixExpenses':
            return {...state, myFixedExpenses: [...state.myFixedExpenses, action.payload]};
        case 'add_fixIncomes':
            return {...state, myFixedExpenses: [...state.myFixedIncomes, action.payload]};*/
        default:
            return state;
    }
};


const updateReq = dispatch => async ({/*
                                          addictedStatus, avgExpensesLastThreeMonths, target,
                                          dateOfBirth, maritalStatus, fixedIncomes, fixedExpenses*/}) =>{
  /*  try {
        await AsyncStorage.setItem('target', target);
        await AsyncStorage.setItem('fixedIncomes', fixedIncomes);
        await AsyncStorage.setItem('fixedExpenses', fixedExpenses);


        dispatch({type: 'add_target', payload: target});
        dispatch({type: 'add_fixedIncomes', payload: fixedIncomes});
        dispatch({type: 'add_fixedExpenses', payload: fixedIncomes});

        // const response = await serverApi.post('/XXX', {firstName,lastName,phoneNumber,email,password,confirmPassword});
        //  await AsyncStorage.setItem('id', response.data.id);

        dispatch({type: 'update_user', payload:'' /*response.data.id*///});
      /*  navigate('indexWallet');
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong try again'});
        navigate('Profile');
    }*/

};
export const {Provider, Context} = createDataContext(
    requestReducer,
    { /*login, logOut, passwordRecovery,*/  updateReq/*, addFriend, navigateAccordingKindOfUser*/ },
    {
       email:'', category:'', necessaryMeasure:'', description:'',price:0, remark:'', errorMessage:''
       /* id:'', firstName:'XXX',lastName:'YYY',
        target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], avgExpenses:0,
        walletMember: false, friendMember: false,
        passes:0,*/

    }
);