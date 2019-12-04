import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers'

export const store = createStore(authReducer,
    applyMiddleware(thunk));
    // window.__REDUX_DEVTOOLS_EXTENSION__ && 
    // window.__REDUX_DEVTOOLS_EXTENSION__());