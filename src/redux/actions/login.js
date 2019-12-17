import { SET_LOADING } from '../actionTypes';
import * as userService from '../../services/api/user.service';

const setLoadingAction = (value) => ({
  type: SET_LOADING, value
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
