import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'; 

export const fetchPosts = () => (dispatch) => {
    dispatch(postsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'posts', {
        headers: {
            'Authorization': bearer
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
            .then(list => dispatch(addPosts(list)))
            .catch(error => dispatch(postsFailed(error.message)));
}

export const postsLoading = () => ({
    type: ActionTypes.POST_LOADING
});

export const postsFailed = (errmess) => ({
    type: ActionTypes.POST_FAILED,
    payload: errmess
})

export const addPosts = (list) => ({
    type: ActionTypes.ADD_POST,
    payload: list
})


export const writePost = (data) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
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
    .then(response => dispatch(postPost(response)))
    .catch(error => {console.log('Write Posts ' + error.message)
            alert('Your Post could not be posted\n Error: ' + error.message)})
}


export const postPost = (list) => ({
    type: ActionTypes.WRITE_POST,
    payload: list
})


export const deletePost = (id) => (dispatch) => {
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'posts/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : bearer
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
    .then(response => console.log('post deleted ' + response))
    .catch(error => {console.log('Delete post ' + error.message)
    alert('Your Post could not be deleted\n Error: ' + error.message)})
}

export const updatePost = (data, id) => (dispatch) => {
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'posts/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : bearer
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
    .then(response => dispatch(editPost(response)))
    .catch(error => {console.log('Update post ' + error.message)
    alert('Your Post could not be updated\n Error: ' + error.message)})
}

export const editPost = (post) => ({
    type: ActionTypes.EDIT_POST,
    payload: post
})


export const deleteAllPost = () => (dispatch) => {
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'posts/', {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : bearer
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
    .then(response => console.log('posts deleted ' + response))
    .catch(error => {console.log('Delete posts ' + error.message)
    alert('Your Posts could not be deleted\n Error: ' + error.message)})
}




export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
 
export const receiveSignup = () => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: message
    }
}

export const SignupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        payload: message
    }
}
export const signupUser = (creds) => (dispatch) => {
    dispatch(requestSignup(creds))

    return fetch(baseUrl + 'users/signup', {
        method : 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // Dispatch the success action
            dispatch(receiveSignup());
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(SignupError(error.message)))
};



export const loginUser = (creds) => (dispatch) => {
    console.log(JSON.stringify(creds))
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchPosts());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}