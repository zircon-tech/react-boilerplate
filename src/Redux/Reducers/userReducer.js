import types from '../ActionTypes';

const initialState = {
  currentUser: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_CURRENT_USER: 
    return {
      ...state, 
      currentUser: action.value, 
    }; 
    
  default: return state;
  }
};

export default user;