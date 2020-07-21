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
            return{...state, email: action.payload};
        case 'add_target':
            return{...state, target: action.payload};
        case 'add_fixExpenses':
            return {...state, myFixedExpenses: [...state.myFixedExpenses, action.payload]};
        case 'add_fixIncomes':
            return {...state, myFixedExpenses: [...state.myFixedIncomes, action.payload]};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signin':
            return {errorMessage: '', myUser: action.payload};
        case 'entrance_error':
            return {...state, errorMessage: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'signout':
            return {myUser: null, errorMessage: ''};
        case 'add_friend':
            return {...state, myWalletMembers: [...state.myWalletMembers, action.payload]};
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

      /*
        const response = await serverApi.patch('/user', {firstName,this.lastName,this.phoneNumber,this.email,this.password,this.confirmPassword, addictedStatus, avgExpensesLastThreeMonths, target,
           dateOfBirth, maritalStatus, fixedExpenses, fixedIncomes});
        await AsyncStorage.setItem('user', response.data.user);

        dispatch({type: 'add_user', payload: response.data.user});
        console.log(this.myUser);
        navigate('dashboard');
*/
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
        navigate('Signup');
    }

};

const clearErrorMessage = dispatch=>()=>{
    dispatch({type: 'clear_error_message'});
};

//for registration
const signIn = dispatch=> async ({email, password}) => {
    //make api request to sign up with that email and password
    try {
        const response = await serverApi.post('/user/signIn', {email, password});
        await AsyncStorage.setItem('id', response.data.id);
        dispatch({type: 'signin', payload: response.data.id});
        navigate('Registration');
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with sign up'});
        console.log(email);
        console.log(password);

    }

};

// for Login
const login = dispatch=> async ({email, password})=>{
    //make api request to login with that email and password
    try {
        const response = await serverApi.post('user/logIn', {email, password});
        await AsyncStorage.setItem('id', response.data.id);
        dispatch({type: 'signin', payload: response.data.id});
        navigate('dashboard');

        // ***need to add case of friend****
    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Wrong email or password'});
        console.log(email);
        console.log(password);
        console.log(err);
    }

};

const signOut = dispatch=>async ()=>{
    await AsyncStorage.removeItem('id');
    dispatch({type: 'signout'});
    navigate('Signin');
};


export const {Provider, Context} = createDataContext(
    userReducer,
    { addUser, updateUser, clearErrorMessage,navigateAccordingKindOfUser, tryLocalSignIn, login, signIn, signOut, addFriend },
    {
        id: '',firstName:'XXX',lastName:'YYY', email:null, phoneNumber:'000000', myUser: null,
        target:0, myWalletMembers: [], myFixedExpenses: [], myFixedIncomes: [], avgExpenses:0,
        walletMember: false, friendMember: false,
        passes:0,
        errorMessage:''
    }
);
