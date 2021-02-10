import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import dealsReducer from './todo-reducer.js';

const reducer = combineReducers({
	deals: dealsReducer,
})

//Chrome-extension (REDUX)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;