import types from '../ActionTypes';

const initialState = {
  loading: false
};

const loader = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_LOADING: 
    return {
      ...state, 
      loading: action.value, 
    }; 
  default: return state;
  }
};

export default loader;