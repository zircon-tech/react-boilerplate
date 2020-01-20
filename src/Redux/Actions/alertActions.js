import types from '../ActionTypes';

const success = (message = "The operation was successful") => ({ type: types.ALERT_SUCCESS, message });
const error = (message = "There was an error, please try again.") => ({ type: types.ALERT_ERROR, message });
const clear = () => ({ type: types.ALERT_CLEAR });

export default {
  success,
  error,
  clear
};