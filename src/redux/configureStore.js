import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Post} from './post';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const Store = createStore(
        combineReducers({
            post: Post,
            auth: Auth
        })             //Redux Store
        ,
        applyMiddleware(thunk, logger)
    );
    
    return Store;
}