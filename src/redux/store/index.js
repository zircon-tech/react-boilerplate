import { createStore , applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(authReducer, composeEnhancers(applyMiddleware(thunk))

);