import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";

const statisticsReducer = (state, action)=>{
    switch(action.type)
    {

        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'approveVsAll':
            return {...state, approveVsAll: action.payload}
        case 'approvedVsDenied':
            return {...state, approvedVsDenied: action.payload}
        case 'MonthlyBalance':
            return {...state, MonthlyBalance: action.payload }
        case 'MoneyISaved':
            return {...state, MoneyISaved: action.payload }
        default:
            return state;
    }
};

const approveVsAll = dispatch => async (email)=>{
    try{
        const response = await serverApi.post('/statistics/approveVsAll', {email});
        dispatch({type: 'approveVsAll', payload: response.data})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }
}
const approvedVsDenied = dispatch => async (email)=>{
    try{
        const response = await serverApi.post('/statistics/approvedVsDenied', {email});
        dispatch({type: 'approvedVsDenied', payload: response.data})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }
}
const MonthlyBalance = dispatch => async (email)=>{
    try{
        const response = await serverApi.post('/statistics/MonthlyBalance', {email});
        dispatch({type: 'MonthlyBalance', payload: response.data})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

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


export const {Provider, Context} = createDataContext(
    statisticsReducer,
    { approveVsAll, approvedVsDenied, MonthlyBalance, MoneyISaved },
    {approveVsAll:0, approvedVsDenied:0, MonthlyBalance:0, MoneyISaved:0}
);
