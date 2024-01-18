
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
    try {
        const response = await csrfFetch('/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.jwt);
            dispatch(setUser(data.user));
        } else {
            throw new Error('Login failed.');
        }
    } catch (err) {
        dispatch(setError(err.message));
    }

    return response;
};

//LOGOUT a USER
export const logout = () => async (dispatch) => {
    localStorage.removeItem('jwt');  // Clear JWT token
    dispatch(removeUser());
};

//RESTORE User thunk action
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/authenticate');
    const data = await response.json();
    localStorage.setItem('jwt', data.jwt);
    dispatch(setUser(data.user));
    return response;
};

//SIGNUP a USER
export const signup = (user) => async (dispatch) => {
    const { username, email, password, profilePic } = user;
    try {
        const response = await csrfFetch('/api/users', {
            method: 'POST',
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
            localStorage.setItem('jwt', data.jwt);
            dispatch(setUser(data.user));
        } else {
            throw new Error('Signup failed.');
        }
    } catch (err) {
        dispatch(setError(err.message));
    }
    return response;
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
        } else {
            throw new Error('Update failed.');
        }
    } catch (err) {
        dispatch(setError(err.message));
    }
    return response;
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