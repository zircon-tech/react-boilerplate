import { createStore , applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers'

const intialState = {
    email:'',
    passsord:'',
    loading:false
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(authReducer, intialState, composeEnhancers(applyMiddleware(thunk))

);