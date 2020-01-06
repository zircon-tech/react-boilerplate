import { SET_LOADING } from '../ActionTypes';
import SET_CURRENT_USER from '../ActionTypes/userActionsTypes';

const initialState = {
  loading: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_LOADING: 
    return {
      ...state, 
      loading: action.value, 
    }; 
  case SET_CURRENT_USER: 
    return {
      ...state, 
      currentUser: action.value, 
    }; 
    
  default: return state;
  }
};

export default user;