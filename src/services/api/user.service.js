import { unAuthAxiosCall, authAxiosCall} from './axiosCall';
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
  '/user/forgot-password',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        email,
        url: '/resetPassword'
      }
    )
  }
);

export const forgotPasswordConfirm = async (user, token) => (
  unAuthAxiosCall('/forgot_password_confirm', {
    method: 'POST',
    body: JSON.stringify({
      newPassword: user.newPassword,
      token
    })
  })
);

export function logout() {
  return authAxiosCall(
    '/logout',
    {
      method: 'POST',
    }
  ).then(() => {
    deleteToken();
  });
}