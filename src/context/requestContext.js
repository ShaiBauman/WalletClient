import {Alert, AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const requestReducer = (state, action)=>{
    switch(action.type)
    {
        case 'loading':
            return {...state, is_loading: action.payload}
        case 'get_all_requests':
            return {...state, allRequests: action.payload};
        case 'add_error': {
            Alert.alert("", action.payload);
            return {...state, errorMessage: action.payload};
        }
        case 'add_success_message': {
            Alert.alert("", action.payload);
            return {...state, successMessage: action.payload};
        }
        case 'howMuchISpentThisMonth':
            return {...state,requests:action.payload};
        case 'requestsByStatus':
            return {...state,requests:action.payload};
        case 'requestsByCloseDate':
            return {...state,requests:action.payload};
        case 'requestsByOpenDate':
            return {...state,requests:action.payload};
        case 'requestsByCategory':
            return {...state,requests:action.payload};
        case 'requestsIApprovedToUsers':
            return {...state,requests:action.payload};
        case 'getRequestById':
            return {...state,requests:action.payload};
        case 'getRequestsByConfirmationStatus':
            return {...state,requests:action.payload};
        case 'delete_request':
            return {...state, requests: state.allRequests.filter((req) => req["_id"] !== action.payload)}
        case 'changeApprovedToPaid':
            return {...state,
                ApprovedReq: state.ApprovedReq.filter((req) => req["_id"] !== action.payload.req["_id"]),
                PaidReq: [...state.PaidReq, action.payload.req]}
        case 'getApprovedReq':
            return {...state,ApprovedReq:action.payload};
        case 'getPaidReq':
            return {...state,PaidReq:action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'clear_success_message':
            return {...state, successMessage: ''}
        case 'signout':
            return {};
        case 'reactToRequest':
            return {...state,requests:state.requests.filter((req)=>req["_id"] !== action.payload)}
        default:
            return state;
    }
};

const clearErrorMessage = dispatch=>()=>{
    dispatch({type: 'clear_error_message'});
};

const clearSuccessMessage = dispatch=>()=>{
    dispatch({type: 'clear_success_message'});
};

const addReq = dispatch=> async (RequestDto)=>{

    try {
        dispatch({type: 'loading', payload: true})
        console.log("RequestDto "+ JSON.stringify(RequestDto))
        await serverApi.patch('/request', {'request':RequestDto});
        dispatch({type: 'loading', payload: false})
        navigate('dashboard');
     }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with add request'});
        dispatch({type: 'loading', payload: false})
    }
};

const updateStatus = dispatch => async ({id,email,confirmationStatus})=>{

   try {
       dispatch({type: 'loading', payload: true})
       const response = await serverApi.post('/request/ReactToRequest', {id,email,confirmationStatus});
       dispatch({type: 'loading', payload: false})

  }
   catch (err)
   {
       dispatch({type:'add_error', payload:'Something went wrong with update request Status'});
       console.log(this.errorMessage);
       dispatch({type: 'loading', payload: false})
   }

};

const getAllRequests = dispatch=> async (userType,email)=>{
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/all', {userType, email});
        dispatch({type:'get_all_requests', payload: response.data})
        dispatch({type: 'loading', payload: false})
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get all requests'});
        dispatch({type: 'loading', payload: false})
    }
}
const changeApprovedToPaid = dispatch => async (userId, req) => {
    dispatch({type: 'changeApprovedToPaid', payload: {userId, req}});
}
const getApprovedReq = dispatch => async (email)=>{
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/getRequestByConfirmationStatus',
            {"userType":0,"confirmationStatus":1,email});
        if(response.data !== null)
            dispatch({type: 'getApprovedReq', payload: response.data});
        dispatch({type: 'loading', payload: false})
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with getApprovedReq'});
        dispatch({type: 'loading', payload: false})
    }
};
const getPaidReq = dispatch => async (email)=>{
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/getRequestByConfirmationStatus',
            {"userType":0,"confirmationStatus":2,email});
        if(response.data !== null)
            dispatch({type: 'getPaidReq', payload: response.data});
        dispatch({type: 'loading', payload: false})
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with getPaidReq'});
        dispatch({type: 'loading', payload: false})
    }
};
    const getRequestsByConfirmationStatus = dispatch=> async (userType,confirmationStatus,email)=>{

        try {
            dispatch({type: 'loading', payload: true})
            const response = await serverApi.post('/request/getRequestByConfirmationStatus', {userType,confirmationStatus,email});
        if(response.data !== null)
            dispatch({type: 'getRequestsByConfirmationStatus', payload: response.data});
            dispatch({type: 'loading', payload: false})
        }
        catch (err)

        {
            dispatch({type:'add_error', payload:'Something went wrong with get all requests'});
            dispatch({type: 'loading', payload: false})
        }
    };



const getRequestById = dispatch=> async (id)=>{

    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/'+{id});
     //   return response.data;
        dispatch({type: 'getRequestById', payload: response.data});
        dispatch({type: 'loading', payload: false})

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get request by id'});
        dispatch({type: 'loading', payload: false})
    }

};
const approveByPasses=dispatch=>async (userId,requestId)=>{

    try{
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/approveByPasses', {userId,requestId});
        dispatch({type:'add_success_message',payload: response.data})
        dispatch({type: 'loading', payload: false})
        navigate("dashboard")


    }catch (err) {
        dispatch({type:'add_error', payload:'Something went wrong with approve by pass'});
        dispatch({type: 'loading', payload: false})
    }

};


const requestsByCategory = dispatch=> async (RequestByC /*email,category*/)=>{

    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/getRequestByCategory', {/*email,category*/ RequestByC});
           // return response.data;
        dispatch({type: 'requestsByCategory', payload: response.data});
        dispatch({type: 'loading', payload: false})
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
        dispatch({type: 'loading', payload: false})
    }

};

const requestsByOpenDate = dispatch=> async (email,userType,openDate)=>{

    try {
        const response = await serverApi.get('/request/getRequestByOpenDate', {email,userType,openDate});
     //   return response.data
        dispatch({type: 'requestsByOpenDate', payload: response.data});

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
    }

};

const requestsByCloseDate = dispatch=> async (email,userType,closeDate)=>{

    try {
        const response = await serverApi.get('/request/getRequestByCloseDate', {email,userType,closeDate});
           // return response.data;
        dispatch({type: 'requestsByCloseDate', payload: response.data});

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
    }

};


const requestsByStatus = dispatch=> async (email,confirmationStatus)=>{

    try {
        const response = await serverApi.post('/request/getRequestByConfirmationStatus', {email,confirmationStatus});
        dispatch({type: 'requestsByStatus', payload: response.data});

       // return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get requests'});
    }

};


const  howMuchISpentThisMonth = dispatch=> async (email)=>{

    try {
        const response = await serverApi.post('/statistics/monMoney', email);
        //return response.data;
        dispatch({type: 'howMuchISpentThisMonth', payload: response.data});

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get expenses'});
    }

};

const updateRequest = dispatch=> async (requestDto)=>{
    console.log(Request)
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/updateRequest', {'requestDto':requestDto});
        if(response.data.id)
        {dispatch({type:'add_success_message',payload: 'create success request'})
            dispatch({type: 'loading', payload: false})
        navigate('dashboard');}
    }
    catch (err)
    {
        console.log(err)
        dispatch({type:'add_error', payload:'Something went wrong with add request'});
        dispatch({type: 'loading', payload: false})
    }
};
    const deleteRequest = dispatch=> async (id)=>{
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/deleteRequest',{id});
        dispatch({type:'delete_request', payload: id})
        dispatch({type:'add_success_message',payload: response.data})
        dispatch({type: 'loading', payload: false})
        navigate('openReqs');
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with delete request'});
        dispatch({type: 'loading', payload: false})
    }
};

const remindFriends = dispatch=> async (requestId)=>{
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/remindFriend',{requestId});
        console.log("response.data "+response.data)
        dispatch({type:'add_success_message',payload: response.data})
        dispatch({type: 'loading', payload: false})
            navigate('openReqs');

    }
    catch (err)
    {
        console.log(err)
        dispatch({type:'add_error', payload:'Something went wrong with remind friends'});
        dispatch({type: 'loading', payload: false})
    }
};

const  ReactToRequest = dispatch=> async (id,email,confirmationStatus)=>{
    try {
        dispatch({type: 'loading', payload: true})
        const response = await serverApi.post('/request/reactToRequest',{id,email,confirmationStatus});
        dispatch({type:'add_success_message',payload:response.data})
        dispatch({type:'reactToRequest',payload:id})
        await serverApi.post('/request/remindFriend',{requestId:id});
        dispatch({type: 'loading', payload: false})
        navigate("indexFriend")

    }
    catch (err)
    {
        console.log(err)
        dispatch({type:'add_error', payload:'Something went wrong with remind friends'});
        dispatch({type: 'loading', payload: false})
    }
};


//for sign out
const logOut = dispatch=>async ()=>{
    dispatch({type: 'signout'});
};



export const {Provider, Context} = createDataContext(
    requestReducer,
    {addReq,updateStatus,ReactToRequest,howMuchISpentThisMonth,requestsByStatus,
        getRequestsByConfirmationStatus, getPaidReq, getApprovedReq, requestsByCategory,updateRequest,deleteRequest,
        requestsByCloseDate, getAllRequests,requestsByOpenDate, getRequestById, approveByPasses,
        clearErrorMessage,clearSuccessMessage,remindFriends, logOut, changeApprovedToPaid},
    { errorMessage:'',successMessage:''}
);
