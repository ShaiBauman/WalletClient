import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";

const statisticsReducer = (state, action)=>{
    switch(action.type)
    {

        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'expensesByCategory':
            return {...state, array: action.payload}
        default:
            return state;
    }
};

//get expenses by category
const getExpensesByCategory = dispatch => async (email)=>{

    try{

        const response = await serverApi.post('/statistics/expensesByCategory', {email});
        dispatch({type: 'expensesByCategory', payload: response.data})
    }
    catch (e) {
        dispatch({type:'add_error', payload:'warning'});

    }


}





export const {Provider, Context} = createDataContext(
    statisticsReducer,
    {  },
    { errorMessage: '',
    }
);
