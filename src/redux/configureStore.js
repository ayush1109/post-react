import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {WishList} from './wishList';

export const ConfigureStore = () => {
    const Store = createStore(
        combineReducers({
            wishlist: WishList,
        })             //Redux Store
        ,
        applyMiddleware(thunk, logger)
    );
    
    return Store;
}