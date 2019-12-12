import { unAuthAxiosCall } from './axiosCall';
import { deleteToken } from '../../components/auth/auth'; 

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
  // return authAxiosCall(
  //   '/logout',
  //   {
  //     method: 'POST',
  //   }
  // ).then(() => {
  //   deleteToken();
  // });
}