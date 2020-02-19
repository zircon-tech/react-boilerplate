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

export const register = async (user) => unAuthAxiosCall(
  '/auth',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        firstName: user.first_name,
        lastName: user.last_name,
        cellphone: user.phone_number,
        email: user.email,
        password: user.password,
      }
    ),
  }
);

export const getUserProfile = async (email) => {
  let user = await authAxiosCall(
    `/users/profile/${email}`,
    {
      method: 'GET',
    }
  );
  user = {
    ...user,
    first_name: user.firstName,
    last_name: user.lastName
  };
  return user;
};

export const updateUserProfile = async (user) => authAxiosCall(
  '/users/profile',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        firstName: user.first_name,
        lastName: user.last_name,
      }
    ),
  }
);

export const forgotPassword = (email) => unAuthAxiosCall(
  '/auth/forgot_password',
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

export const forgotPasswordConfirm = async (user, token) => (
  unAuthAxiosCall('/auth/forgot_password_confirm', {
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
    '/auth/google_account',
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
  '/auth/forgot_password_checktoken',
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
        firstName: first_name,
        lastName: last_name,
        email,
      })
    }
  );
}
