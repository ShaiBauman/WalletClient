import createDataContext from './createDataContext';
import serverApi from "../api/serverApi";
import {navigate} from "../navigationRef";
import {Alert} from "react-native";


const BotReducer = (state, action) => {
  switch (action.type) {
    case 'add_success_message': {
      Alert.alert("", action.payload);
      return {...state, successMessage: action.payload};
    }
    case 'get_bot_quest':
      let bot_arr = getBotQuestion(action.payload, 6);
      return {...state, bot_arr: bot_arr}
    case 'get_ml_status':
      return {...state, ml_status: action.payload.status}
    default:
      return state;
  }
};

const getBotQuestion = (question_array, num_of_question) => {
  if (num_of_question > question_array.length) {
    return question_array
  }

  let question_set = new Set();
  while(question_set.size < num_of_question) {
    let question_num = Math.floor(Math.random() * question_array.length + 1)
    question_set.add(question_num)
  }

  let new_question_set_array = Array.from(question_set).sort(function(a, b){return a - b})

  let new_question_array = []
  for(let index = 0; index < new_question_set_array.length; index++){
    new_question_array.push(question_array[new_question_set_array[index] - 1])
  }
  return new_question_array
}

const getBotQuest = dispatch => {
  return async () => {
    try {
      const response = await serverApi.get('/question');
      dispatch({ type: 'get_bot_quest', payload: response.data });
    } catch (e) {
      console.log("NetworkError")
    }
  };
};

const setBotScore = dispatch => async (req, botScore) => {
    try {
      await serverApi.post('/bot/insertBotScore', {reqId: req["_id"], botScore: botScore})
      dispatch({type: 'add_success_message', payload: 'Thank You! You Can Check The Transactions Area If Our ML ' +
            'Approved Your Request'})
      navigate("dashboard", {"req": req})
    } catch (e)
    {
      console.log("insertBotScore Problem")
    }
  }

export const { Context, Provider } = createDataContext(
  BotReducer,
  { getBotQuest, setBotScore },
  []
);
