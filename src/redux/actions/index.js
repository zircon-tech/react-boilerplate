import { SET_LOADING } from '../actionTypes'
import * as userService from '../../services/api/user.service';

export const doLogin = (email, password) => async dispatch => {
    dispatch({type: SET_LOADING, value: true})
    const response = await userService.login(email, password);
    dispatch({type: SET_LOADING, value: false})
    return response;
}  
