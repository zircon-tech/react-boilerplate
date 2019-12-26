import { authAxiosCall } from './axiosCall';

const checkValidationToken = async () => authAxiosCall(
  '/token/prices',
  {
    method: 'GET',
  }
);

export default checkValidationToken;