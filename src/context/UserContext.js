import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const userReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_user':
            return {errorMessage: '', myUser: action.payload};
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
        case 'add_email':
            return{...state, lastName: action.payload};
        case 'add_target':
            return{...state, target: action.payload};
        case 'add_fixExpenses':
            return {...state, myFixedExpenses: [...state.myFixedExpenses, action.payload]};
        case 'add_fixIncomes':
            return {...state, myFixedExpenses: [...state.myFixedIncomes, action.payload]};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        default:
            return state;
    }
};

const clearErrorMessage = dispatch=>()=>{
    dispatch({type: 'clear_error_message'});
};

const navigateAccordingKindOfUser = dispatch=> (userType) =>{
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

const addUser = dispatch=> async ({firstName,lastName,phoneNumber,email,password,confirmPassword})=>{

    try {
        const response = await serverApi.post('/user', {firstName,lastName,phoneNumber,email,password,confirmPassword});
        await AsyncStorage.setItem('user', response.data.user);
        dispatch({type: 'add_user', payload: response.data.user});
        dispatch({type: 'add_firstName', payload: firstName});
        dispatch({type: 'add_firstName', payload:lastName});
        dispatch({type: 'add_email', payload:email});

    }
      catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with registration'});
        console.log(this.myUser);
    }
};

const updateUser = dispatch => async ({
addictedStatus, avgExpensesLastThreeMonths, target,
dateOfBirth, maritalStatus, fixedIncomes, fixedExpenses}) =>{
    try {
       await AsyncStorage.setItem('target', target);
       await AsyncStorage.setItem('fixedIncomes', fixedIncomes);
       await AsyncStorage.setItem('fixedExpenses', fixedExpenses);


        dispatch({type: 'add_target', payload: target});
        dispatch({type: 'add_fixedIncomes', payload: fixedIncomes});
        dispatch({type: 'add_fixedExpenses', payload: fixedIncomes});

       const response = await serverApi.patch('/user', {addictedStatus, avgExpensesLastThreeMonths, target,
           dateOfBirth, maritalStatus, fixedIncomes, fixedExpenses});
        await AsyncStorage.setItem('user', response.data.user);

        dispatch({type: 'add_user', payload: response.data.user});
        console.log(this.myUser);
        navigate('indexWallet');

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with update profile'});
        console.log(this.errorMessage);

    }

};
/*
const getImageById = dispatch=> ()=>{

};


const addFriend = dispatch =>async ()=>{

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
    { addUser, updateUser, clearErrorMessage,navigateAccordingKindOfUser },
    {
        id:'', firstName:'XXX',lastName:'YYY', email:'', myUser: null,
        target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], avgExpenses:0,
        walletMember: false, friendMember: false,
        passes:0,
        errorMessage:''
    }
);
