import {Alert, AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const requestReducer = (state, action)=>{
    switch(action.type)
    {
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
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'clear_success_message':
            return {...state, successMessage: ''}
        case 'signout':
            return {};
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
    console.log(Request)
    try {
        const response = await serverApi.patch('/request', {'request':RequestDto});
        navigate('dashboard');

     }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with add request'});
    }
};

const updateStatus = dispatch => async ({id,email,confirmationStatus})=>{

   try {
       const response = await serverApi.post('/request/ReactToRequest', {id,email,confirmationStatus});

  }
   catch (err)
   {
       dispatch({type:'add_error', payload:'Something went wrong with update request Status'});
       console.log(this.errorMessage);
   }

};

const getAllRequests = dispatch=> async (userType,email)=>{
    try {
        const response = await serverApi.post('/request/all', {userType, email});
        dispatch({type:'get_all_requests', payload: response.data})
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get all requests'});
    }
}

    const getRequestsByConfirmationStatus = dispatch=> async (userType,confirmationStatus,email)=>{

        try {
            const response = await serverApi.post('/request/getRequestByConfirmationStatus', {userType,confirmationStatus,email});

        if(response.data !== null)
           // return response.data;
            dispatch({type: 'getRequestsByConfirmationStatus', payload: response.data});
            dispatch({})
        }
        catch (err)
        {
            dispatch({type:'add_error', payload:'Something went wrong with get all requests'});
        }
    };



const getRequestById = dispatch=> async (id)=>{

    try {
        const response = await serverApi.post('/request/'+{id});
     //   return response.data;
        dispatch({type: 'getRequestById', payload: response.data});

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get request by id'});
    }

};
const approveByPasses=dispatch=>async (userId,requestId)=>{

    try{
        const response = await serverApi.post('/request/approveByPasses', {userId,requestId});
        dispatch({type:'add_success_message',payload: response.data})
        navigate("dashboard")


    }catch (err) {
        dispatch({type:'add_error', payload:'Something went wrong with approve by pass'});
    }

};


const requestsByCategory = dispatch=> async (RequestByC /*email,category*/)=>{

    try {
        const response = await serverApi.post('/request/getRequestByCategory', {/*email,category*/ RequestByC});
           // return response.data;
        dispatch({type: 'requestsByCategory', payload: response.data});

    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
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
        const response = await serverApi.post('/request/updateRequest', {'requestDto':requestDto});
        if(response.data.id)
        {dispatch({type:'add_success_message',payload: 'create success request'})
        navigate('dashboard');}
    }
    catch (err)
    {
        console.log(err)
        dispatch({type:'add_error', payload:'Something went wrong with add request'});
    }
};
    const deleteRequest = dispatch=> async (id)=>{
    try {
        const response = await serverApi.post('/request/deleteRequest',{id});
        dispatch({type:'add_success_message',payload: response.data})
        navigate('openReqs');
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with delete request'});
    }
};

const remindFriends = dispatch=> async (requestId)=>{
    try {
        const response = await serverApi.post('/request/remindFriend',{requestId});
        dispatch({type:'add_success_message',payload: response.data})
            navigate('openReqs');

    }
    catch (err)
    {
        console.log(err)
        dispatch({type:'add_error', payload:'Something went wrong with remind friends'});
    }
};

const  ReactToRequest = dispatch=> async (id,email,confirmationStatus)=>{
    try {
        const response = await serverApi.post('/request/remindFriend',{id,email,confirmationStatus});
        let message = 'approve success'
        if(confirmationStatus===2)
            message = 'Reject success'
        dispatch({type:'add_success_message',payload:message})
        navigate("indexFriend")

    }
    catch (err)
    {
        console.log(err)
        dispatch({type:'add_error', payload:'Something went wrong with remind friends'});
    }
};


//for sign out
const logOut = dispatch=>async ()=>{
    dispatch({type: 'signout'});
};



export const {Provider, Context} = createDataContext(
    requestReducer,
    {addReq,updateStatus,ReactToRequest,howMuchISpentThisMonth,requestsByStatus,
        getRequestsByConfirmationStatus, requestsByCategory,updateRequest,deleteRequest,requestsByCloseDate,
        getAllRequests,requestsByOpenDate, getRequestById, approveByPasses,
        clearErrorMessage,clearSuccessMessage,remindFriends, logOut},
    { errorMessage:'',successMessage:''}
);
