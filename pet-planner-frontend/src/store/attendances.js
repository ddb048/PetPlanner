import { csrfFetch } from "./csrf";

//*******************TYPES*********************/
const LOAD_ATTENDANCES = 'attendances/LOAD_ATTENDANCES';
const ADD_ATTENDANCE = 'attendances/ADD_ATTENDANCE';
const DELETE_ATTENDANCE = 'attendances/DELETE_ATTENDANCE';

//*******************ACTION CREATORS*********************/
const loadAttendances = (petId) => {
    return {
        type: LOAD_ATTENDANCES,
        petId
    };
};

const addAttendance = (petId, event) => {
    return {
        type: ADD_ATTENDANCE,
        payload: {
            petId,
            event
        }
    };
};

const deleteAttendance = (petId, event) => {
    return {
        type: DELETE_ATTENDANCE,
        payload: {
            petId,
            event
    }
    };
}

//*******************THUNKS*********************/
//GET all attendances
export const getAttendancesByPet = (petId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}/events`);
    const data = await response.json();
    dispatch(loadAttendances(data));
    return response;
};

//POST an attendance
export const postAttendance = (petId, event) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}/${event.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petId, event),
    });
    const data = await response.json();
    dispatch(addAttendance(data));
    return data;
};

//DELETE an attendance
export const deleteOneAttendance = (petId, event) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}/${event.id}`, {
        method: 'DELETE',
    });
    dispatch(deleteAttendance(petId, event));
    return response;
};

//*******************REDUCER*********************/
const initialState = {};

const attendancesReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ATTENDANCES:
            newState = { ...state };
            newState.petsEvents = {};
            action.events.forEach((event) => {
                newState.petsEvents[event.id] = event;
            });
            return newState;
        case ADD_ATTENDANCE:
            newState = { ...state };
            newState.events[action.payload.event] = action.payload.event;
            return newState;
        case DELETE_ATTENDANCE:
            newState = { ...state };
            delete newState.petsEvents[action.event.id];
            delete newState.events[action.event.id].pets[action.petId]
            return newState;
        default:
            return state;
    }
}

export default attendancesReducer;
