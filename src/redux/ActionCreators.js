import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'; 

export const fetchWishList = () => (dispatch) => {
    dispatch(wishListLoading(true));

    return fetch(baseUrl + 'wishlist')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(list => dispatch(addWishList(list)))
            .catch(error => dispatch(wishListFailed(error.message)));
}

export const wishListLoading = () => ({
    type: ActionTypes.WISHLIST_LOADING
});

export const wishListFailed = (errmess) => ({
    type: ActionTypes.WISHLIST_FAILED,
    payload: errmess
})

export const addWishList = (list) => ({
    type: ActionTypes.ADD_WISHLIST,
    payload: list
})


export const postWishList = (data) => (dispatch) => {


    return fetch(baseUrl + 'wishlist', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(writeWishList(response)))
    .catch(error => {console.log('Post WishList ' + error.message)
            alert('Your WishList could not be posted\n Error: ' + error.message)})
}


export const writeWishList = (list) => ({
    type: ActionTypes.WRITE_WISHLIST,
    payload: list
})


export const deleteWishList = (id) => (dispatch) => {
    
    return fetch(baseUrl + 'wishlist/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => console.log('wishlist deleted ' + response))
    .catch(error => {console.log('Delete wishlist ' + error.message)
    alert('Your WishList could not be deleted\n Error: ' + error.message)})
}

export const updateWishList = (data, id) => (dispatch) => {
    
    return fetch(baseUrl + 'wishlist/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(editWishList(response)))
    .catch(error => {console.log('Update wishlist ' + error.message)
    alert('Your WishList could not be updated\n Error: ' + error.message)})
}

export const editWishList = (wishlist) => ({
    type: ActionTypes.EDIT_WISHLIST,
    payload: wishlist
})


export const deleteAllWishList = () => (dispatch) => {
    
    return fetch(baseUrl + 'wishlist/', {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => console.log('wishlist deleted ' + response))
    .catch(error => {console.log('Delete wishlist ' + error.message)
    alert('Your WIshList could not be deleted\n Error: ' + error.message)})
}