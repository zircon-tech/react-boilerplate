import alertActions from '../ActionTypes/alertActionsTypes';

const success = (message = "The operation was successful") => ({ type: alertActions.SUCCESS, message });
const error = (message = "There was an error, please try again.") => ({ type: alertActions.ERROR, message });
const clear = () => ({ type: alertActions.CLEAR });

export default {
  success,
  error,
  clear
};