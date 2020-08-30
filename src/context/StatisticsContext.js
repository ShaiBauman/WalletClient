import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {Alert} from "react-native";

const statisticsReducer = (state, action)=>{
    switch(action.type)
    {
        case 'loading':
            return {...state, is_loading: action.payload}
        case 'add_error':
            Alert.alert("", action.payload);
            return {...state, errorMessage: action.payload};
        case 'myWalletMembers':
            return {...state, myWalletMembers: action.payload}
        case 'infoAboutFriend':
            return {...state, infoAboutFriend: action.payload}
        case 'approveVsAll':
            return {...state, approveVsAll: action.payload}
        case 'approvedVsDenied':
            return {...state, approvedVsDenied: action.payload}
        case 'MonthlyBalance':
            return {...state, MonthlyBalance: action.payload }
        case 'MoneyISaved':
            return {...state, MoneyISaved: action.payload }
        case 'expenseByCategory':
            return {...state, expenseByCategory: action.payload}
        default:
            return state;
    }
};

const myWalletMembers = dispatch => async (myEmail) => {
    try {
        const response = await serverApi.post('/statistics/myWalletMembers', {myEmail})
        dispatch({type:'myWalletMembers', payload: response.data})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'})
    }
}

const infoAboutFriend = dispatch => async (myEmail, walletMemberEmail) => {
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/statistics/infoAboutFriend', {myEmail, walletMemberEmail})
        dispatch({type:'infoAboutFriend', payload: response.data})
        dispatch({type: 'loading', payload: false})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'})
        dispatch({type: 'loading', payload: false})
    }
}

const approveVsAll = dispatch => async (email)=>{
    try{
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/statistics/approveVsAll', {email});
        dispatch({type: 'approveVsAll', payload: response.data})
        dispatch({type: 'loading', payload: false})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});
        dispatch({type: 'loading', payload: false})
    }
}
const approvedVsDenied = dispatch => async (email)=>{
    try{
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/statistics/approvedVsDenied', {email});
        dispatch({type: 'approvedVsDenied', payload: response.data})
        dispatch({type: 'loading', payload: false})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});
        dispatch({type: 'loading', payload: false})
    }
}
const MonthlyBalance = dispatch => async (email)=>{
    try{
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/statistics/MonthlyBalance', {email});
        dispatch({type: 'MonthlyBalance', payload: response.data})
        dispatch({type: 'loading', payload: false})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});
        dispatch({type: 'loading', payload: false})

    }
}
const MoneyISaved = dispatch => async (email)=>{
    try{

        const response = await serverApi.post('/statistics/MoneyISaved', {email});
        dispatch({type: 'MoneyISaved', payload: response.data})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }
}

const expenseByCategory = dispatch => async (email) => {
    try{
        const response = await serverApi.post('/statistics/expenseByCategory', {email})
        dispatch({type:'expenseByCategory', payload: response.data})
    }
    catch (e) {
        dispatch({type: 'add_error', payload: 'Sorry'})
    }
}


export const {Provider, Context} = createDataContext(
    statisticsReducer,
    { myWalletMembers, approveVsAll, approvedVsDenied, MonthlyBalance, MoneyISaved, expenseByCategory,
        infoAboutFriend},
    {approveVsAll:0, approvedVsDenied:0, MonthlyBalance:0, MoneyISaved:0}
);
