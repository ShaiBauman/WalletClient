import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";

const financialReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_credit_card':
            return {errorMessage: 'This is invalid credit card', myCreditCard: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
};


const getCreditCard = dispatch => async ({userId}) =>{

};

const addCreditCard = dispatch =>async ({userId, cardNumber, valid,cvc,companyName})=>{

    try {
        const response = await serverApi.post('/financial/creditCard', {userId,cardNumber,valid,cvc,companyName});

        dispatch({type: 'add_credit_card', payload: response.data});
    }
    catch (err)
    {
        dispatch({type:'add_error', payload:'Something went wrong with registration'});

    }
};

export const {Provider, Context} = createDataContext(
    financialReducer,
    {  addCreditCard /*, getCreditCard */},
    {
        id:''
    }
);
