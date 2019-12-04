import { SET_LOADING } from '../actionTypes'
import { callBackLogin } from '../../services/api/fake_back_login';

export const doLogin = (email, password) => dispatch => {
    dispatch({type: SET_LOADING, value: true})
    return callBackLogin(email, password).then(response => {
        dispatch({type: SET_LOADING, value: false})
   })
}  
