import * as alert from "./alertActionsTypes";
import * as modal from "./modalActionTypes";
import * as user from "./userActionsTypes";

const combined = { ...alert, ...modal, ...user };

export default combined;
