import { SET_LOADING } from '../actionTypes';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_LOADING: 
    return {
      ...state, 
      loading: action.value, 
    }; 
  default: return state;
  }
};