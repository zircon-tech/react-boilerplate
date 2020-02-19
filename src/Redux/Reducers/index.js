import { combineReducers } from "redux";

import user from "./userReducer";
import alert from "./alertReducer";
import modal from "./modalReducer";
import loader from "./loaderReducer";

const rootReducer = combineReducers({
  user,
  alert,
  modal,
  loader,
});

export default rootReducer;
