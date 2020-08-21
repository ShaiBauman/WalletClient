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
            return {...state, errorMessagePassword: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: '',errorMessagePassword:''};
        case 'clear_error_message_password_recovery':
            return {...state, errorMessagePassword: ''};
        case 'entrance_error':
            return {...state, errorMessage: action.payload};
        case 'signout':
            return {myUser: {}, id:'', errorMessage: ''};
        case 'answer_password':
            return {...state, isResetPass:action.payload};
        case 'add_friend':
            return action.payload;
        case 'signin':
            return {errorMessage: '', id: action.payload};
        default:
            return state;
    }
};

const clearErrorMessage = dispatch=>()=>{
    dispatch({type: 'clear_error_message'});
};
// for registration V
const addUser = dispatch=> async (userDto)=>{

    try {
        const response = await serverApi.post('/user/signIn', {userDto});
        await AsyncStorage.setItem('id', response.data,_id);
        console.log(response.data + ' check');
        dispatch({type: 'add_user', payload: response.data});
        dispatch({type: 'add_id', payload: response.data._id});

        if(response.data.walletMember) //the user is a wallet and a friend
        {
          navigate('Profile');
        }
        else //the user is a friend
        {
            navigate('indexMember');
        }
        console.log(response.data.walletMember)
    }
      catch (err)
    {
        dispatch({type:'entrance_error', payload:'Something went wrong with registration'});
    }
};

//for update profile V

const updateUser = dispatch => async (walletMemberDto) =>{

    try {

        const response = await serverApi.patch('/user', {walletMemberDto});
       // await AsyncStorage.setItem('user', response.data);

        dispatch({type: 'add_user', payload: response.data});
        console.log(response.data);
        navigate('dashboard');

    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Something went wrong with update profile'});
        console.log(this.errorMessage);

    }

};
/*
const getImageById = dispatch=> ()=>{

};


*/

const addFriend = dispatch=> async (userId, friendEmail)=> {
try {
    console.log(userId+' '+friendEmail)
    const response = await serverApi.post('/user/addWalletFriend', {userId, friendEmail});

    dispatch({type:'add_friend', payload:response.data});
}
catch (e) {
    dispatch({type:'add_error', payload:'Something went wrong with add friend'});
}

}


// for user already has login
//need to change
const tryLocalSignIn = dispatch => async ()=>
{
    const id = await AsyncStorage.getItem('id');
    if(id)
    {
        const response = await serverApi.get('/user', {id});
        dispatch({type: 'add_user', payload: response.data})
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
const verificationPasswordAnswer = dispatch => async (email, answer) =>{
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

const updatePassword = dispatch => async (email, newPassword) => {
    try
    {
        const response = await serverApi.post('/user/updatePassword', {email, newPassword});
        navigate("Singin");
    }
    catch (e) {
        dispatch({type:'add_error', payload:'The password has not been updated'});
    }
};

const getUserByEmail = dispatch => async (email)=>{

    try{

    const response = await serverApi.post('/user/byEmail', {email});
        dispatch({type: 'add_friend', payload: response.data})

    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }


}

/*
const getUserById = dispatch => async (id)=>{

    try{

        const response = await serverApi.get('/user', {id});
        dispatch({type: 'add_user', payload: response.data})

    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }


}
*/
export const {Provider, Context} = createDataContext(
    userReducer,
    { addUser, updateUser, clearErrorMessage, getUserByEmail,
        tryLocalSignIn, login, signOut, addFriend,verificationPasswordAnswer,updatePassword },
    { id: '', myUser: {}, isResetPass: false, errorMessage:'', errorMessagePassword:''
    }
);
