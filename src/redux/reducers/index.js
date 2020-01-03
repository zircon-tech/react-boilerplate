import { combineReducers } from 'redux';

import user from './userReducer';
import alert from './alertReducer';

const rootReducer = combineReducers({
  user,
  alert,
});

export default rootReducer;