import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";

const financialReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_credit_card':
            return {...state, lastDigits: action.payload};
        case 'make_transaction':
            return {...state, lastDigits: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
};


const getLastDigitsCreditCard = dispatch => async (userId) =>{
    try {
        const url = "/financial/creditCard/" + userId;
        const response = await serverApi.get(url).then(
            response => response,
            error => console.log(error)
        );

        if(response.data) {

            dispatch({type: 'add_credit_card', payload: response.data});
            return response.data;
        }
    }
    catch (err)
    {
        console.log('Something went wrong with get credit card info');
        dispatch({type:'add_error', payload:'Something went wrong with get credit card info'});

    }
};

const addCreditCard = dispatch =>async (userId, cardNumber, valid,cvc,companyName)=>{

    try {
        const response = await serverApi.post('/financial/creditCard', {userId,cardNumber,valid,cvc,companyName}).then(
            response => response,
            error => console.log(error)
        );
        if(response.data) {
            dispatch({type: 'add_credit_card', payload: response.data});
        }
    }
    catch (err)
    {
        console.log('Something went wrong with registration');
        dispatch({type:'add_error', payload:'This is invalid credit card'});

    }
};

const makeTransaction = dispatch =>async (userId, requestId)=>{

    try {
        const response = await serverApi.post('financial/transaction', {userId,requestId}).then(
            response => response,
            error => console.log(error)
        );
        if(response.data) {
            dispatch({type: 'make_transaction', payload: response.data});
        }
    }
    catch (err)
    {
        console.log('Something went wrong with registration');
        dispatch({type:'add_error', payload:'This is invalid credit card'});

    }
};

export const {Provider, Context} = createDataContext(
    financialReducer,
    {  addCreditCard , getLastDigitsCreditCard, makeTransaction},
    {
    }
);
