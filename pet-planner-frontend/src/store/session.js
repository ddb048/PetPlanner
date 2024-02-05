import { jwtDecode } from 'jwt-decode';
import { csrfFetch } from './csrf';


// Function to save the token after successful login
export function saveToken(token) {
    localStorage.setItem('userToken', token);
}

//TYPES

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_USER = 'session/updateUser';
const SET_ERROR = 'session/setError';

//ACTION CREATORS

//SET a USER
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};


//REMOVE a USER
const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


//UPDATE a USER
const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    };
};

// Set an ERROR
const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

//THUNKS

//LOGIN a USER
export const login = (user) => async (dispatch) => {
    const { username, password } = user;
    localStorage.removeItem('userToken');  // Clear JWT token
    try {
        const response = await csrfFetch('/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();
        if (response.ok) {

            console.log('data from login thunk', data);

            // console.log('jwt', data.jwt);
            saveToken(data.jwt);

            // console.log("response ok and data", data);

            const decodedToken = jwtDecode(data.jwt);

            // console.log('decodedToken', decodedToken)
            const userId = decodedToken.userId;

            // console.log('userId', userId);

            const userResponse = await csrfFetch(`/api/users/${userId}`);
            const userData = await userResponse.json();

            //console.log('userData for login thunk', userData.data);


            // console.log('userData', userData);

            dispatch(setUser(userData.data));
        } else {
            return { success: false, message: data.message || 'Authentication failed' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Failed to authenticate' };
    }

};

//LOGOUT a USER
export const logout = () => async (dispatch) => {
    localStorage.removeItem('userToken');  // Clear JWT token
    dispatch(removeUser());
};

//RESTORE User thunk action
export const restoreUser = (token) => async (dispatch) => {
   // const { userToken, JWT } = token;
    // console.log('userToken before being sent to backend within thunk', token, userToken, JWT);

    const response = await fetch('http://localhost:8080/reauthenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token,
    });
    const data = await response.json();

    //  console.log('data from restoreUser thunk', data);

    if (response.ok) {


        const userResponse = await csrfFetch(`/api/users/${data.userId}`);
        const userData = await userResponse.json();


         console.log('userData from restoreUser', userData.data);

        dispatch(setUser(userData.data));

    }

    return response;
};

//SIGNUP a USER
export const signup = (user) => async (dispatch) => {
    const { username, email, password} = user;
    console.log('user from signup thunk', user, profilePic);
    try {
        const response = await csrfFetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password,
                profilePic: "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg",
                role: "ROLE_USER"
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data from signup user", data);
            localStorage.setItem('jwt', data.jwt);
            dispatch(setUser(data.data));
            return response;
        } else {
            throw new Error('Signup failed.');
        }
    } catch (err) {
        dispatch(setError(err.message));
    }

};

//UPDATE a USER
export const update = (user) => async (dispatch) => {
    const { username, email, password, profilePic } = user;
    try {
        const response = await csrfFetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password,
                profilePic
            }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateUser(data.user));
            return response;
        } else {
            throw new Error('Update failed.');
        }
    } catch (err) {
        dispatch(setError(err.message));
    }

};

//INITIAL STATE OBJECT
const initialState = { user: null };

//REDUCER
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state, { user: action.payload });
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state, { user: null });
            return newState;
        case UPDATE_USER:
            newState = Object.assign({}, state, { user: action.payload });
            return newState;
        case SET_ERROR:
            newState = Object.assign({}, state, { error: action.payload });
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
