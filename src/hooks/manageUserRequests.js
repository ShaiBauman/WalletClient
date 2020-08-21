import {useContext} from 'react';
import {Context as UserContext} from '../context/UserContext';
import {Context as RequestContext} from '../context/requestContext';

export default ()=>{
    const {state} = useContext(UserContext);
    const {addReq, updateStatus, getAllRequests, getRequestsByPass, requestsByCategory, requestsByOpenDate,
        requestsByCloseDate, requestsByStatus, howMuchISpentThisMonth} = useContext(RequestContext);

const addRequest = (request)=>{
    addReq(state.myUser.email, request);
};

    return [manageUserRequests];
};
