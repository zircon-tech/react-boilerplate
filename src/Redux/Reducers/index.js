import { combineReducers } from "redux";

import user from "./userReducer";
import alert from "./alertReducer";
import modal from "./modalReducer";

const rootReducer = combineReducers({
  user,
  alert,
  modal
});

export default rootReducer;
