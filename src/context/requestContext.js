import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";

const requestReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'add_success_message':
            return {...state, errorMessage: action.payload};

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


const addReq = dispatch=> async ({email,openDate,closedDate,category,cost,description,necessity,additionalDescription,
                                     pic,confirmationStatus,friendsConfirmation,botConfirmation,score})=>{

    try {
        const response = await serverApi.post('/request', {email,openDate,closedDate,category,cost,description,necessity,additionalDescription,
            pic,confirmationStatus,friendsConfirmation,botConfirmation,score});
        if(response.data.id)
            dispatch({type:'add_success_message',payload: 'create success request'})
     }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with add request'});
    }
};

const updateStatus = dispatch => async ({id,email,confirmationStatus})=>{

   try {
       const response = await serverApi.patch('/request', {id,email,confirmationStatus});

  }
   catch (err)
   {
       dispatch({type:'add_error', payload:'Something went wrong with update request Status'});
       console.log(this.errorMessage);
   }

};

const addFutureApprovedRequest = dispatch=> async ({email,openDate,closedDate,category,cost,description,necessity,additionalDescription,
                                                       pic,confirmationStatus})=>{
    try {
        const response = await serverApi.post('/request', {email,openDate,closedDate,category,cost,description,necessity,additionalDescription,
            pic,confirmationStatus});
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with approved request'});
    }
};



    const getAllRequests = dispatch=> async (userType,confirmationStatus,email)=>{

        try {
            const response = await serverApi.post('/request', {userType,confirmationStatus,email});

        if(response.data !== null)
            return response.data;
        }
        catch (err)
        {
            dispatch({type:'add_error', payload:'Something went wrong with get all requests'});
        }
    };

const getRequestById = dispatch=> async (id)=>{

    try {
        const response = await serverApi.post('/request', {id});
        return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get request by id'});
    }

};

const getRequestsByPass=dispatch=>async (userId,requestId)=>{

    try{
        const response = await serverApi.post('/request', {userId,requestId});

    }catch (err) {
        dispatch({type:'add_error', payload:'Something went wrong with get request'});
    }

};

const requestsIApprovedToUsers = dispatch=> async (myEmail)=>{// my email= friend member

    try {
        const response = await serverApi.post('/request', {myEmail});
            return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get requests '});
    }
};


const requestsByCategory = dispatch=> async (email,category)=>{

    try {
        const response = await serverApi.post('/request', {email,category});
            return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
    }

};

const requestsByOpenDate = dispatch=> async (email,openDate)=>{

    try {
        const response = await serverApi.post('/request', {email,openDate});
        return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
    }

};

const requestsByCloseDate = dispatch=> async (email,closeDate)=>{

    try {
        const response = await serverApi.post('/request', {email,closeDate});
            return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with requests'});
    }

};


const requestsByStatus = dispatch=> async (email,status)=>{

    try {
        const response = await serverApi.post('/request', {email,status});
            return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get requests'});
    }

};


const  howMuchISpentThisMonth = dispatch=> async (email)=>{

    try {
        const response = await serverApi.post('/request', {email});
            return response.data;
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with get expenses'});
    }

};


/*
//for friend member
const getAllStatusRequests = dispatch=> async (email,status)=>{

try {
    const response = await serverApi.post('/request', {email,status});
    await AsyncStorage.setItem('request', response.data.arrayStatus);
 //   dispatch({type: 'all_ApprovedReq', payload: response.data.request});

}
catch (err)
{
    dispatch({type:'add_error', payload:'Something went wrong with registration'});
   // console.log(this.myUser);
}
};*/


export const {Provider, Context} = createDataContext(
    requestReducer,
    {addReq,updateStatus,addFutureApprovedRequest,getAllRequests,howMuchISpentThisMonth,requestsByStatus,
        requestsByCategory,requestsByCloseDate,requestsByOpenDate,requestsIApprovedToUsers,getRequestById},
    { errorMessage:'',successMessage:'',
    }
);