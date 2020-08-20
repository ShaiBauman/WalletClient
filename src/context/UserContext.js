import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const userReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_user':
            return {...state,errorMessage: '', myUser: action.payload};
        case 'add_id':
            return {...state,errorMessage: '', id: action.payload};
       case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'add_type_wallet':
            return {...state, walletMember: true};
        case 'add_type_friend':
            return {...state, friendMember: true};
        case 'add_fixExpenses':
            return {...state, myFixedExpenses: [...state.myFixedExpenses, action.payload]};
        case 'add_fixIncomes':
            return {...state, myFixedIncomes: [...state.myFixedIncomes, action.payload]};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
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
/*
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
*/

// for registration V
const addUser = dispatch=> async (userDto)=>{

   //console.log(firstName + ' '+ lastName+ ' ' + phoneNumber+ ' '+email+ ' '+password+' '+answerPassword+' '+yearOfBirth+' '+ userType);

    console.log(userDto);

    try {
        const response = await serverApi.post('/user', {userDto});
        await AsyncStorage.setItem('user', response.data);
        await AsyncStorage.setItem('id', response.data,_id);
        dispatch({type: 'add_user', payload: response.data});
        dispatch({type: 'add_id', payload: response.data._id});
        if(userType === 'both') //the user is a wallet and a friend
        {
          navigate('Profile');
        }
        else if(userType === 'wallet') //the user is a wallet
        {
            navigate('Profile');
        }
        else //the user is a friend
        {
            navigate('indexMember');
        }
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

    const checkedIfExists ={
        if(myUser)
        {
            passes = myUser.passes;
            myWalletMembers =myUser.myWalletMembers;
        }
    }

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
const login = dispatch=> async (email, password)=>{
    //make api request to login with that email and password
    try {

        const response = await serverApi.post('/user/logIn', {email,password});
        await AsyncStorage.setItem('id', response.data._id);
        dispatch({type: 'add_user', payload: response.data});
        dispatch({type: 'add_id', payload: response.data._id});
        dispatch({type: 'add_myFixedIncome', myFixedIncome: response.data.myFixedIncome});
        dispatch({type: 'add_myFixedExpenses', payload: response.data.myFixedExpenses});
        navigate('dashboard');

        // ***need to add case of friend****
    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Wrong email or password'});
    }

};

//for sign out
const signOut = dispatch=>async ()=>{
    await AsyncStorage.removeItem('id');
    dispatch({type: 'signout'});
    navigate('Signin');
};

//check answer for recovery password
const verificationPasswordAnswer = dispatch => async ({email, answer}) =>{
    try
    {
       const response = await serverApi.post('/user/verificationPasswordAnswer', {email, answer});
        console.log("answer:" + response.data)
           dispatch({type: 'answer_password', payload: response.data})
            if(!response.data)
                dispatch({type: 'add_error', payload: 'Wrong answer, try again'})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'Something went wrong'});
    }
};

const updatePassword = dispatch => async ({email, newPassword}) => {
    try
    {
        const response = await serverApi.post('/user/updatePassword', {email, newPassword});
        navigate("Singin");
    }
    catch (e) {
        dispatch({type:'add_error', payload:'The password has not been updated'});
    }
};

export const {Provider, Context} = createDataContext(
    userReducer,
    { addUser, updateUser, clearErrorMessage, tryLocalSignIn, login, signOut, addFriend,verificationPasswordAnswer,updatePassword },
    { id: '', myUser: {}, errorMessage:'', myFixedIncome:[], myFixedExpenses:[]
    }
);
