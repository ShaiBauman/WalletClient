import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const userReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_user':
            return {errorMessage: '', myUser: action.payload};
        case 'add_id':
            return {errorMessage: '', id: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'add_type_wallet':
            return {...state, walletMember: true};
        case 'add_type_friend':
            return {...state, friendMember: true};
        case 'add_fixExpenses':
            return {...state, myFixedExpenses: [...state.myFixedExpenses, action.payload]};
        case 'add_fixIncomes':
            return {...state, myFixedExpenses: [...state.myFixedIncomes, action.payload]};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'login':
            return {errorMessage: '', myUser: action.payload};
        case 'entrance_error':
            return {...state, errorMessage: action.payload};
        case 'signout':
            return {myUser: null, id:'', errorMessage: ''};
        case 'add_friend':
            return {...state, myWalletMembers: [...state.myWalletMembers, action.payload]};
        case 'answer_password':
            return action.payload;
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


// for registration V
const addUser = dispatch=> async ({firstName,lastName,phoneNumber,email,password,answerPassword,yearOfBirth})=>{
    let userDto = {
        firstName,
        lastName,
        email,
        password,
        answerPassword,
        phoneNumber,
        yearOfBirth
    }

    try {
        const response = await serverApi.post('/user', {userDto});
        await AsyncStorage.setItem('user', response.data);
        await AsyncStorage.setItem('id', response.data,id);
        dispatch({type: 'add_user', payload: response.data});
        dispatch({type: 'add_id', payload: response.data.id});
        console.log(myUser);

    }
      catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with registration'});
    }
};

//for update profile V
// avgExpensesLastThreeMonths ???
// need to check arrays
const updateUser = dispatch => async ({addictedStatus, avgExpensesLastThreeMonths, myTarget, maritalStatus, myFixedIncomes, myFixedExpenses}) =>{

    let walletMember = true;
    let passes = 5;
    let myWalletMembers =[];
    let walletMemberDto = {
        maritalStatus,
        addictedStatus,
        myTarget,
        walletMember,
        myWalletMembers,
        myFixedExpenses,
        myFixedIncomes,
        passes
    }

    try {

       dispatch({type: 'add_fixedIncomes', payload: myFixedIncomes});
       dispatch({type: 'add_fixedExpenses', payload: myFixedExpenses});
        const response = await serverApi.patch('/user', {walletMemberDto});
        await AsyncStorage.setItem('user', response.data);

        dispatch({type: 'add_user', payload: response.data});
        console.log(myUser);
        navigate('dashboard');

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


*/

const addFriend = dispatch=> async ({firstName,lastName,phoneNumber,email,password,confirmPassword})=> {
    const response = await serverApi.post('/user', {firstName,lastName,phoneNumber,email,password,confirmPassword});
    dispatch({type: 'add_friend', payload: email});

}


// for user already has login
//need to change
const tryLocalSignIn = dispatch => async ()=>
{
    const id = await AsyncStorage.getItem('id');
    if(id)
    {
        dispatch({type: 'signin', payload: id});
        navigate('dashboard');
    }
    else
    {
        navigate('registration');
    }

};

// for Login V
const login = dispatch=> async ({userEmail, userPassword})=>{
    //make api request to login with that email and password
    try {
        const response = await serverApi.post('/user/logIn', {userEmail, userPassword});
        await AsyncStorage.setItem('user', response.data);
        dispatch({type: 'login', payload: response.data.id});
        navigate('dashboard');

        // ***need to add case of friend****
    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Wrong email or password'});
        console.log(err);
    }

};

//for sign out
const signOut = dispatch=>async ()=>{
    await AsyncStorage.removeItem('user');
    dispatch({type: 'signout'});
    navigate('Signin');
};

//check answer for recovery password
const verificationPasswordAnswer = dispatch => async ({userId, answer}) =>{
    try
    {
       const response = await serverApi.post('/user', {userId, answer});
       if(response.data)
        dispatch({type: 'answer_password', payload: response.data})
        else
       {
           dispatch({type: 'answer_password', payload: response.data})
           dispatch({type:'add_error', payload:'Incorrect answer'});
       }
    }
    catch (e) {
        dispatch({type:'add_error', payload:'Something went wrong'});
    }
};

const updatePassword = dispatch => async ({userId, newPassword}) => {
    try
    {
        const response = await serverApi.post('/user/updatePassword', {userId, newPassword});
        navigate("Singin");
    }
    catch (e) {
        dispatch({type:'add_error', payload:'The password has not been updated'});
    }
};

export const {Provider, Context} = createDataContext(
    userReducer,
    { addUser, updateUser, clearErrorMessage,navigateAccordingKindOfUser, tryLocalSignIn, login, signOut, addFriend,verificationPasswordAnswer,updatePassword },
    { id: '', myUser: null,
        target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], avgExpenses:0,
        walletMember: false, friendMember: false,
        passes:0,
        errorMessage:''
    }
);
