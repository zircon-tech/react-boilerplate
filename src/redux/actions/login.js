import actions from '../ActionTypes';
import * as userService from '../../Services/Api/userService';

const setLoadingAction = (value) => ({
  type: actions.SET_LOADING, value
});


const doLogin = (email, password) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.login(email, password)
    .then(
      response => {
        dispatch(setLoadingAction(false));
        return response;
      },
      error => {
        dispatch(setLoadingAction(false));
        throw error;
      }
    );
};  

export default doLogin;
