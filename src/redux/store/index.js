import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../Reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-disable-next-line import/prefer-default-export
export const store = createStore(authReducer, composeEnhancers(applyMiddleware(thunk)));