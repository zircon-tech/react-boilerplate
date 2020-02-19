import { unAuthAxiosCall, authAxiosCall } from './axiosCall';
import { deleteToken } from '../../Lib/Utils/auth';

export const login = async (email, password) => unAuthAxiosCall(
  '/login',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        email,
        password,
      }
    )
  }
);

export const registerFromInvitation = async (user, token) => unAuthAxiosCall(
  '/auth/invitation/accept',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: user.password,
        token : token,
        url: 'register?token=',
      }
    ),
  }
);

export const register = async (user) => unAuthAxiosCall(
  '/user',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        cellphone: user.phone_number,
        email: user.email,
        password: user.password,
      }
    ),
  }
);

export const forgotPassword = (email) => unAuthAxiosCall(
  '/user/forgot_password',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        email,
        url: 'reset_password?token='
      }
    )
  }
);

export const sendInvitation = (email) => authAxiosCall(
  '/auth/invitation/invite',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        email,
        url: 'register?token='
      }
    )
  }
);

export const forgotPasswordConfirm = async (user, token) => (
  unAuthAxiosCall('/user/forgot_password_confirm', {
    method: 'POST',
    body: JSON.stringify({
      password: user.newPassword,
      token
    })
  })
);

export function logout() {
  deleteToken();
  return Promise.resolve(true);
  // return authAxiosCall(
  //   '/logout',
  //   {
  //     method: 'POST',
  //   }
  // ).then(() => {
  //   deleteToken();
  // });
}

export function loginWGoogle(accessToken, user) {
  return unAuthAxiosCall(
    '/user/google_account',
    {
      method: "POST",
      body: JSON.stringify({
        token: accessToken,
        user: user || {}
      })
    }
  );
}

export const checkValidationToken = async (token) => authAxiosCall(
  '/user/forgot_password_checktoken',
  {
    method: 'POST',
    body: JSON.stringify({
      token
    })
  }
);

export function loginWFB(fbResponse, user) {
  return unAuthAxiosCall(
    '/auth/facebook/check-token',
    {
      method: "POST",
      body: JSON.stringify({
        accessToken: fbResponse.accessToken,
        expiresIn: fbResponse.expiresIn,
        userId: fbResponse.userId,
        user: user || {},
      })
    }
  );
}

export function loginWithTwitter(oauth_token, oauth_verifier, first_name, last_name, email) {
  return unAuthAxiosCall(
    '/auth/twitter/access-token',
    {
      method: "POST",
      query: {
        oauth_token,
        oauth_verifier,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
      })
    }
  );
}

export const checkInvitationToken = async (token) => authAxiosCall(
  `/auth/invitation/check/${token}`,
  {
    method: 'GET',
  }
);
