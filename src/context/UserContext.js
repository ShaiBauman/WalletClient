import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const userReducer = (state, action)=>{
    switch(action.type)
    {
        case 'log_in':
            return {...state,errorMessage: '', id: action.payload["_id"], myUser: action.payload};
       case 'add_error':
            return {...state, errorMessagePassword: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: '',errorMessagePassword:''};
        case 'clear_error_message_password_recovery':
            return {...state, errorMessagePassword: ''};
        case 'entrance_error':
            return {...state, errorMessage: action.payload};
        case 'sign_out':
            return {myUser: {}, id:'', errorMessage: '', errorMessagePassword:'',
                isResetPass:false, myFriends:[], passes:0};
        case 'answer_password':
            return {...state, isAnswerCorrect: action.payload};
        case 'add_friend':
            return { ...state, myFriends: [...state.myFriends, action.payload] };
        case 'delete_friend':
            return {...state, myFriends: state.myFriends.filter((friend) => friend.email !== action.payload.email)};
        case 'add_myFriends':
            return {...state, myFriends: action.payload}
        case 'update_passes':
            return {...state, passes: action.payload}
        default:
            return state;
    }
};

const clearErrorMessage = dispatch=>()=>{
    dispatch({type: 'clear_error_message'});
};
// for registration V
const RegisterNewUser = dispatch=> async (userDto)=>{
    try {
        const response = await serverApi.post('/user/signIn', {userDto});
        await AsyncStorage.setItem('id', response.data["_id"], null);
        dispatch({type: 'log_in', payload: response.data});

        if(response.data.walletMember) //the user is a wallet and a friend
        {
          navigate('Profile');
        }
        else if(response.data["friendMember"]) //the user is a friend only
        {
            navigate('indexFriend');
        }
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
        dispatch({type: 'log_in', payload: response.data});
        navigate('dashboard');

    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Something went wrong with update profile'});
        console.log(this.errorMessage);

    }

};

const addFriend = dispatch=> async (userId, friendEmail)=> {
    try {
        const response = await serverApi.post('/user/addWalletFriend', {userId, friendEmail});

        dispatch({type: 'add_friend', payload: response.data});

    }
    catch (e) {
        dispatch({type:'add_error', payload:'Something went wrong with add friend'});
    }

}


// for user already has login
const tryLocalSignIn = dispatch => async ()=>
{
    const id = await AsyncStorage.getItem('id');
    if(id)
    {
        const response = await serverApi.get('/user/' + id, undefined);
        dispatch({type: 'log_in', payload: response.data});
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
    if (email === "") {
        email = "shai.bauman@gmail.com";
        password = '123456'
    }
    try {

        const response = await serverApi.post('/user/logIn', {email,password});
        await AsyncStorage.setItem('id', response.data["_id"], null);
        dispatch({type: 'log_in', payload: response.data});
        dispatch({type: 'add_id', payload: response.data["_id"]});


        if(response.data.walletMember)
           navigate('dashboard');
        else
            navigate('indexFriend');

    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Wrong email or password'});
    }

};

//for sign out
const signOut = dispatch=>async ()=>{
    await AsyncStorage.removeItem('id');
    dispatch({type: 'sign_out'});
    navigate('SignIn');
};

//check answer for recovery password
const verificationPasswordAnswer = dispatch => async (email, answer) =>{
    try
    {
       const response = await serverApi.post('/user/verificationPasswordAnswer', {email, answer});
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
        await serverApi.post('/user/updatePassword', {email, newPassword});
        navigate("SignIn");
    }
    catch (e) {
        dispatch({type:'add_error', payload:'The password has not been updated'});
    }
};

const getFriendsByEmail = dispatch => async (email) => {
    try{
        const response = await serverApi.post('/user/usersInfo', {email})
        dispatch({type: 'add_myFriends', payload:response.data})
    } catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }
}

const deleteFriend = dispatch=> async (userId, friendEmail)=> {
    try {
        const response = await serverApi.post('/user/deleteWalletFriend', {userId, friendEmail});

        dispatch({type: 'delete_friend', payload: response.data});

    } catch (e) {
        dispatch({type: 'add_error', payload: 'Something went wrong with delete friend'});
    }
}

const getPasses =  dispatch=> async (email)=> {
    try {
        const response = await serverApi.post('/user/passes', {email});

        dispatch({type: 'update_passes', payload: response.data});

    }
    catch (e) {
        dispatch({type:'add_error', payload:'Something went wrong with get passes'});
    }

}


export const {Provider, Context} = createDataContext(
    userReducer,
    {updateUser, getFriendsByEmail, clearErrorMessage,
        tryLocalSignIn, login, signOut, addFriend, RegisterNewUser,
        deleteFriend, verificationPasswordAnswer,updatePassword, getPasses },
    { id: '', myUser: {}, isResetPass: false,
        errorMessage:'', errorMessagePassword:'',myFriends:[], passes:0
    }
);
