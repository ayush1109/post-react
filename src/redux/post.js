import * as ActionTypes from './ActionTypes';        //Reducer Functions

export const Post = (state = {
    isLoading: true,
    errMess: null,
    post: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POST:
            return { ...state, isLoading: false, errMess: null, post: action.payload };

        case ActionTypes.POST_LOADING:
            return { ...state, isLoading: true, errMess: null, post: [] };

        case ActionTypes.POST_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, post: [] };

        default:
            return state;
    }
}