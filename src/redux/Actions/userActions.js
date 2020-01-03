import { SET_LOADING } from '../ActionTypes';
import SET_CURRENT_USER from '../ActionTypes/userActionsTypes';
import * as userService from '../../Services/Api/userService';
import alertActions from './alertActions';
import ClientError from '../../Lib/Utils/exceptions';
import { setToken } from '../../Lib/Utils/auth';

const setLoadingAction = (value) => ({
  type: SET_LOADING, value
});

const setCurrentUser = (value) => ({
  type: SET_CURRENT_USER, value
});


export const doLogin = (email, password) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.login(email, password)
    .then(
      response => {
        dispatch(setCurrentUser(response.data.user.first_name));
        dispatch(setLoadingAction(false));
        setToken(response.data.jwtToken);
        return true;
      },
      error => {
        dispatch(setLoadingAction(false));
        const _message = 'The user or password was incorrect!, please try again.';
        const message = (error instanceof ClientError) ? _message : 'Internal Error';
        dispatch(alertActions.error(message));
      }
    );
}; 

export const doLoginWGoogle = (accessToken, user) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.loginWGoogle(accessToken, user)
    .then(
      response => {
        dispatch(setCurrentUser(response.data.user.first_name));
        dispatch(setLoadingAction(false));
        return response;
      },
      error => {
        dispatch(setLoadingAction(false));
        const message = (error instanceof ClientError) ? error.message : 'Internal Error';
        dispatch(alertActions.error(message));
      }
    );
}; 

export const doRegister = (user) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.register(user)
    .then(
      () => {
        dispatch(alertActions.success("The user was reigister successfully"));
        dispatch(setLoadingAction(false));
        return true;
      },
      error => {
        dispatch(setLoadingAction(false));
        const message = (error instanceof ClientError) ? error.message : 'Internal Error';
        dispatch(alertActions.error(message));
      }
    );
};

export const doForgotPassword = (email) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.forgotPassword(email)
    .then(
      () => {
        dispatch(alertActions.success("The email was sent, please check your mailbox."));
        dispatch(setLoadingAction(false));
      },
      error => {
        dispatch(setLoadingAction(false));
        const message = (error instanceof ClientError) ? error.message : 'Internal Error';
        dispatch(alertActions.error(message));
      }
    );
};

export const doResetPassword = (user, token) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.forgotPasswordConfirm(user, token)
    .then(
      (response) => {
        dispatch(alertActions.success("The password was changed successfully!"));
        dispatch(setLoadingAction(false));
        setToken(response.data.jwtToken);
      },
      error => {
        dispatch(setLoadingAction(false));
        const message = (error instanceof ClientError) ? error.message : 'Internal Error';
        dispatch(alertActions.error(message));
      }
    );
};

export const doCheckValidationToken = (token) => dispatch => {
  dispatch(setLoadingAction(true));
  return userService.checkValidationToken(token)
    .then(
      () => {
        dispatch(setLoadingAction(false));
      },
      error => {
        dispatch(setLoadingAction(false));
        const message = (error instanceof ClientError) ? error.message : 'Internal Error';
        dispatch(alertActions.error(message));
      }
    );
};