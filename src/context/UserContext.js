import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const userReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_user':
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
        case 'add_phoneNumber':
            return{...state, phoneNumber: action.payload};
        case 'add_email':
            return{...state, email: action.payload};
        case 'add_password':
            return{...state, password: action.payload};
        case 'add_answerPassword':
            return{...state, answerPassword: action.payload};
        case 'add_target':
            return{...state, target: action.payload};
        case 'add_addictedStatus':
            return{...state, addictedStatus: action.payload};
        case 'add_dateOfBirth':
            return{...state, addictedStatus: action.payload};
        case 'add_avgExpensesLastThreeMonths':
            return{...state, avgExpensesLastThreeMonths: action.payload};
        case 'add_maritalStatus':
            return{...state, maritalStatus: action.payload};
        case 'add_fixExpenses':
            return {...state, myFixedExpenses: [...state.myFixedExpenses, action.payload]};
        case 'add_fixIncomes':
            return {...state, myFixedExpenses: [...state.myFixedIncomes, action.payload]};
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


const addUser = dispatch =>async ({firstName,lastName,phoneNumber,email,password,confirmPassword, userType})=>{

    try {
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('lastName', lastName);
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('answerPassword', confirmPassword);
      //  const response = await serverApi.post('/XXX', {firstName,lastName,phoneNumber,email,password,confirmPassword});
     //   await AsyncStorage.setItem('id', response.data.id);

        dispatch({type: 'add_user', payload: ''/*response.data.id*/});
        dispatch({type: 'add_firstName', payload: firstName});
        dispatch({type: 'add_lastName', payload: lastName});
        dispatch({type: 'add_phoneNumber', payload: phoneNumber});
        dispatch({type: 'add_email', payload: email});
        dispatch({type: 'add_password', payload: password});
        dispatch({type: 'add_confirmPassword', payload: confirmPassword});



     //   navigateAccordingKindOfUser(userType);
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with registration'});

    }
};

const updateUser = dispatch => async ({
addictedStatus, avgExpensesLastThreeMonths, target,
dateOfBirth, maritalStatus, fixedIncomes, fixedExpenses}) =>{
    try {
        await AsyncStorage.setItem('addictedStatus', addictedStatus);
        await AsyncStorage.setItem('avgExpensesLastThreeMonths', avgExpensesLastThreeMonths);
        await AsyncStorage.setItem('target', target);
        await AsyncStorage.setItem('dateOfBirth', dateOfBirth);
        await AsyncStorage.setItem('maritalStatus', maritalStatus);
        await AsyncStorage.setItem('fixedIncomes', fixedIncomes);
        await AsyncStorage.setItem('fixedExpenses', fixedExpenses);

        dispatch({type: 'add_addictedStatus', payload: addictedStatus});
        dispatch({type: 'add_avgExpensesLastThreeMonths', payload: avgExpensesLastThreeMonths});
        dispatch({type: 'add_target', payload: target});
        dispatch({type: 'add_dateOfBirth', payload: dateOfBirth});
        dispatch({type: 'add_maritalStatus', payload: maritalStatus});
        dispatch({type: 'add_fixedIncomes', payload: fixedIncomes});
        dispatch({type: 'add_fixedExpenses', payload: fixedIncomes});

       // const response = await serverApi.post('/XXX', {firstName,lastName,phoneNumber,email,password,confirmPassword});
      //  await AsyncStorage.setItem('id', response.data.id);

        dispatch({type: 'update_user', payload:'' /*response.data.id*/});
        navigate('indexWallet');
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong try again'});
        navigate('Profile');
    }

};
/*
const getImageById = dispatch=>async ()=>{

};
*/

/*
const signUp = dispatch=> async ({}) => {
    //make api request to sign up with that email and password
    try {
        const response = await trackerApi.post('/signup', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('TrackList');
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with sign up'});
        console.log(email);
        console.log(password);
    }

};

const signIn = dispatch=> async ({email, password})=>{
    //make api request to sign in with that email and password
    try {
        const response = await trackerApi.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('TrackList');
    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Wrong email or password'});
        console.log(email);
        console.log(password);
    }

};

const signOut = dispatch=>async ()=>{
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
};

*/
export const {Provider, Context} = createDataContext(
    userReducer,
    { /*login, logOut, passwordRecovery,*/ addUser, updateUser, /*getImageById, navigateAccordingKindOfUser*/ },
    {
        id:'', firstName:'',lastName:'',phoneNumber:'',email:'',password:'',answerPassword:'',
        target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], addictedStatus:0,
        avgExpensesLastThreeMonths:0, dateOfBirth:'', maritalStatus:'',
        walletMember: false, friendMember: false,
        passes:0,
        errorMessage:''
    }
);
