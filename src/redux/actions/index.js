import { SET_LOADING } from '../actionTypes'
import { callBackLogin } from '../../services/api/fake_back_login';

export const doLogin = (email, password) => async dispatch => {
    dispatch({type: SET_LOADING, value: true})
    const response = await callBackLogin(email, password);
    dispatch({type: SET_LOADING, value: false})
    return response;
}  
