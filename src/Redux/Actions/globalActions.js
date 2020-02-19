import types from "../ActionTypes";
import {tap} from "../../Lib/Utils/lang";
import {ClientError} from "../../Lib/Utils/exceptions";
import alertActions from "./alertActions";

export const setLoadingAction = (value) => ({
  type: types.SET_LOADING, value
});

export const setCurrentUser = (value) => ({
  type: types.SET_CURRENT_USER, value
});

export function withGlobalActions(dispatch, prom, successH = () => {}, errorH = () => {}) {
  dispatch(setLoadingAction(true));
  return tap(
    prom,
    (...response) => {
      dispatch(setLoadingAction(false));
      successH(...response);
    },
    (error) => {
      dispatch(setLoadingAction(false));
      const message = (error instanceof ClientError) ? error.message : 'Internal Error';
      dispatch(alertActions.error(message));
      errorH(error);
    }
  );
}
