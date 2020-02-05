import * as alert from "./alertActionsTypes";
import * as modal from "./modalActionTypes";
import * as user from "./userActionsTypes";
import * as loader from "./loaderActionsTypes";

const combined = { 
  ...alert, 
  ...modal, 
  ...user, 
  ...loader
};

export default combined;
