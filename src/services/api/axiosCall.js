import axios from 'axios';
import { API_URL, API_KEY, } from '../../config';
import { getToken } from '../../components/auth/auth';
import ClientError from '../../lib/utils/exceptions';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json', 
    Accept: 'application/json', 
    api_key: API_KEY,
  }
});

const axiosCall = async (url, {query, ...requestOptions}) => {
  try {
    const response = await axiosInstance({
      method: requestOptions.method, 
      url: encodeQueryParams(`${API_URL}${url}`, query),
      data: requestOptions.body 
    });
    
    if (response.status >= 200 && response.status < 400) {
      return response;
    } 
    if (response.status < 500) {
      return response.json().then(
        (jsonData) => {
          throw new ClientError(jsonData.errors[0].msg, jsonData.errors[0].args, response.status);
        }
      );
    } 
  } catch (error) {
    throw new Error("Internal error");
  }
};

const encodeQueryParams = (url, query) => {
  const encodeURL = new URL(url);
  // ToDo: Have to agree how to encode null
  if (query) {
    Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v));
  }
  return encodeURL;
};

export const unAuthAxiosCall = async (url, requestOptions) => {
  const response = await axiosCall(url, requestOptions);
  return response;
};

export const authAxiosCall = async (url, requestOptions) => {
  const response = await axiosCall(
    url,
    {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        Authorization: getToken(),
      },
    },
  );
  return response;
};