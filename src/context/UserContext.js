import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";
import {Alert} from "react-native";

const userReducer = (state, action)=>{
    switch(action.type)
    {
        case 'loading':
            return {...state, is_loading: action.payload}
        case 'log_in':
            return {...state,errorMessage: '', id: action.payload["_id"], myUser: action.payload};
       case 'add_error':
           Alert.alert("", action.payload);
            return {...state, errorMessagePassword: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: '',errorMessagePassword:''};
        case 'clear_error_message_password_recovery':
            return {...state, errorMessagePassword: ''};
        case 'entrance_error':
            Alert.alert("", action.payload);
            return {...state, errorMessage: action.payload};
        case 'add_success_message': {
            Alert.alert("", action.payload);
            return {...state, successMessage: action.payload};
        }
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
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/user/signIn', {userDto});
        await AsyncStorage.setItem('id', response.data["_id"], null);
        dispatch({type: 'log_in', payload: response.data});
        dispatch({type: 'loading', payload: false})
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
        dispatch({type: 'loading', payload: false})
    }
};

//for update profile V

const updateUser = dispatch => async (walletMemberDto) =>{

    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.patch('/user', {walletMemberDto});
        dispatch({type: 'log_in', payload: response.data});
        dispatch({type: 'loading', payload: false})
        navigate('dashboard');

    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Something went wrong with update profile'});
        console.log(this.errorMessage);
        dispatch({type: 'loading', payload: false})
    }

};

const addFriend = dispatch=> async (userId, friendEmail)=> {
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/user/addWalletFriend', {userId, friendEmail});
        console.log((JSON.stringify(response.data)=== '""')+"l;l;")
        if (JSON.stringify(response.data) === '""') {
            dispatch({type:'add_error', payload:'This email is not exist in our system. Check again please'});
        } else {
            dispatch({type: 'add_friend', payload: response.data});
            dispatch({type:'add_success_message', payload: ("" + friendEmail + " added successfully to your friends list")});
        }
        dispatch({type: 'loading', payload: false})

    }
    catch (e) {
        dispatch({type:'add_error', payload:'You are already friends!'});
        dispatch({type: 'loading', payload: false})
    }

}


// for user already has login
const tryLocalSignIn = dispatch => async ()=>
{
    dispatch({type: 'loading', payload: true})
    const id = await AsyncStorage.getItem('id');
    if(id)
    {
        const response = await serverApi.get('/user/' + id, undefined);
        dispatch({type: 'log_in', payload: response.data});
        dispatch({type: 'loading', payload: false})
        navigate('dashboard');
    }
    else
    {
        dispatch({type: 'loading', payload: false})
        navigate('registration');
    }

};

// for Login V
const login = dispatch=> async (email, password)=>{
    //make api request to login with that email and password
    dispatch({type: 'loading', payload: true})
    if (email === "") {
        email = "fake6@gmail.com";
        password = '123456'
    }
    try {

        const response = await serverApi.post('/user/logIn', {email,password});
        await AsyncStorage.setItem('id', response.data["_id"], null);
        dispatch({type: 'log_in', payload: response.data});
        dispatch({type: 'add_id', payload: response.data["_id"]});

        dispatch({type: 'loading', payload: false})
        if(response.data.walletMember)
           navigate('dashboard');
        else
            navigate('indexFriend');

    }
    catch (err)
    {
        dispatch({type:'entrance_error', payload:'Wrong email or password'});
        dispatch({type: 'loading', payload: false})
    }

};

//for sign out
const signOut = dispatch=>async ()=>{
    dispatch({type: 'loading', payload: true})
    await AsyncStorage.removeItem('id');
    dispatch({type: 'sign_out'});
    dispatch({type: 'loading', payload: false})
    navigate('SignIn');
};

//check answer for recovery password
const verificationPasswordAnswer = dispatch => async (email, answer) =>{
    try
    {
        dispatch({type: 'loading', payload: true})
       const response = await serverApi.post('/user/verificationPasswordAnswer', {email, answer});
        console.log("response.data" + response.data)
        if (!response.data) {
            dispatch({type: 'add_error', payload: 'Wrong answer, try again'})
            dispatch({type: 'answer_password', payload: response.data})
        } else if (response.data) {
            dispatch({type: 'answer_password', payload: response.data})
        }
        dispatch({type: 'loading', payload: false})
    }
    catch (e) {
        dispatch({type: 'add_error', payload: 'Email Not Found In Our System. Please Sign In First'})
        dispatch({type: 'answer_password', payload: false})
        dispatch({type: 'loading', payload: false})
    }
};

const updatePassword = dispatch => async (email, newPassword) => {
    try
    {
        dispatch({type: 'loading', payload: true})
        await serverApi.post('/user/updatePassword', {email, newPassword});
        dispatch({type: 'loading', payload: false})
        navigate("SignIn");
    }
    catch (e) {
        dispatch({type:'add_error', payload:'The password has not been updated'});
        dispatch({type: 'loading', payload: false})
    }
};

const getFriendsByEmail = dispatch => async (email) => {
    try{
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/user/usersInfo', {email})
        dispatch({type: 'add_myFriends', payload:response.data})
        dispatch({type: 'loading', payload: false})
    } catch (e) {
        dispatch({type:'add_error', payload:'warning'});
        dispatch({type: 'loading', payload: false})
    }
}

const deleteFriend = dispatch=> async (userId, friendEmail)=> {
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/user/deleteWalletFriend', {userId, friendEmail});

        dispatch({type: 'delete_friend', payload: response.data});
        dispatch({type: 'loading', payload: false})
    } catch (e) {
        dispatch({type: 'add_error', payload: 'Something went wrong with delete friend'});
        dispatch({type: 'loading', payload: false})
    }
}

const getPasses =  dispatch=> async (email)=> {
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/user/passes', {email});

        dispatch({type: 'update_passes', payload: response.data});
        dispatch({type: 'loading', payload: false})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'Something went wrong with get passes'});
        dispatch({type: 'loading', payload: false})
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
