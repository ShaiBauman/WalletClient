import createDataContext from "./createDataContext";
import serverApi from "../api/serverApi";
//import {navigate} from "../navigationRef";

const requestReducer = (state, action)=>{
    switch(action.type)
    {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'all_categories':
            return action.payload;

        default:
            return state;
    }
};

const getAllCategory = dispatch=> async () => {

    try {
        const response = await serverApi.get('/categories');

            dispatch({type: 'all_categories', payload: response.data});
            return response.data;

    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong'});
    }

}

export const {Provider, Context} = createDataContext(
    requestReducer,
    {getAllCategory},
    { errorMessage:''
    }
);
