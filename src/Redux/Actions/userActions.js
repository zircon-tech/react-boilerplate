import * as userService from '../../Services/Api/userService';
import alertActions from './alertActions';
import ClientError from '../../Lib/Utils/exceptions';
import { tap } from '../../Lib/Utils/lang';
import { setToken } from '../../Lib/Utils/auth';
import {setCurrentUser, setLoadingAction, withGlobalActions} from "./globalActions";

export const doLogin = (email, password) => dispatch => {
  dispatch(setLoadingAction(true));
  return tap(
    userService.login(email, password),
    (response) => {
      dispatch(setCurrentUser(response.data.user.first_name));
      dispatch(setLoadingAction(false));
      setToken(response.data.jwtToken);
    },
    (error) => {
      dispatch(setLoadingAction(false));
      const _message = 'The user or password was incorrect!, please try again.';
      const message = (error instanceof ClientError) ? _message : 'Internal Error';
      dispatch(alertActions.error(message));
    }
  );
};

export const doRegisterFromInvitation = (user, token) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.registerFromInvitation(user, token),
    response => {
      dispatch(alertActions.success("The user was successfully saved!"));
      setToken(response.data.jwtToken);
    }
  );
};

export const doLoginWGoogle = (accessToken, user) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.loginWGoogle(accessToken, user),
    (response) => {
      dispatch(setCurrentUser(response.data.user.first_name));
    }
  );
};

export const doRegister = (user) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.register(user),
    () => {
      dispatch(alertActions.success("The user was register successfully"));
    }
  );
};

export const doForgotPassword = (email) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.forgotPassword(email),
    () => {
      dispatch(alertActions.success("The email was sent, please check your mailbox."));
      dispatch(setLoadingAction(false));
    }
  );
};

export const doSendInvitation = email => dispatch => {
  return withGlobalActions(dispatch, userService.sendInvitation(email), () => {
    dispatch(alertActions.success("The email was sent"));
    dispatch(setLoadingAction(false));
  });
};

export const doResetPassword = (user, token) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.forgotPasswordConfirm(user, token),
    (response) => {
      dispatch(alertActions.success("The password was changed successfully!"));
      setToken(response.data.jwtToken);
    }
  );
};

export const doCheckValidationToken = (token) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.checkValidationToken(token)
  );
};

export const doCheckInvitationToken = token => dispatch => {
  return withGlobalActions(dispatch, userService.checkInvitationToken(token));
};

export const doLoginWFB = (fbResponse, user) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.loginWFB(fbResponse, user),
    (response) => {
      dispatch(setCurrentUser(response.data.user.first_name));
    }
  );
};

export const doLoginWTwitter = (oauth_token, oauth_verifier, user) => dispatch => {
  return withGlobalActions(
    dispatch,
    userService.loginWithTwitter(
      oauth_token,
      oauth_verifier,
      user.first_name,
      user.last_name,
      user.email
    ),
    (response) => {
      dispatch(setCurrentUser(response.data.user.first_name));
    },
  );
};
