import { csrfFetch } from "./csrf";

//*******************TYPES*********************/
const LOAD_EVENTS = 'events/LOAD_EVENTS';
const ADD_EVENT = 'events/ADD_EVENT';
const EDIT_EVENT = 'events/EDIT_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';
const LOAD_ONE_EVENT = 'events/LOAD_ONE_EVENT';

//*******************ACTION CREATORS*********************/
const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        events,
    };
};

const addEvent = (event) => {
    return {
        type: ADD_EVENT,
        event,
    };
}

const editEvent = (event) => {
    return {
        type: EDIT_EVENT,
        event,
    };
}

const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        eventId,
    };
}

const loadOneEvent = (event) => {
    return {
        type: LOAD_ONE_EVENT,
        event,
    };
}

//*******************THUNKS*********************/
//GET all Users events
export const getEvents = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/events`);
    const data = await response.json();
    dispatch(loadEvents(data));
    return response;
};

//GET a single event
export const getOneEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);
    const data = await response.json();
    dispatch(loadOneEvent(data));
    return response;
};

//POST a new event
export const createEvent = (event) => async (dispatch) => {
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event),
    });
    const data = await response.json();
    dispatch(addEvent(data));
    return response;
};

//PUT an edited event
export const editOneEvent = (event) => async (dispatch) => {

    console.log('event in thunk', event)
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
    });
    const data = await response.json();

    console.log('data in thunk', data)

    if (response.ok) {
    dispatch(editEvent(data));
    return response;
    } else {
        console.log('error in thunk', data)
    }
};

//DELETE an event
export const deleteOneEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE',
    });
    dispatch(deleteEvent(eventId));
    return response;
};

//*******************REDUCER*********************/
const initialState = {
    events: {},
    OneEvent: {}
};

const eventsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_EVENTS:
            newState = { ...state }
            newState.events = {};
            action.events.forEach((event) => {
                newState.events[event.id] = event;
            });
            return newState;
        case LOAD_ONE_EVENT:
            newState.events = { ...state.events, [action.event.id]: action.event };
            newState.OneEvent = { ...action.event };
            return newState;
        case ADD_EVENT:
            newState = { ...state };
            newState.events[action.event.id] = action.event;
            return newState;
        case EDIT_EVENT:
            return {
                ...state,
                events: {
                    ...state.events,
                    [action.event.id]: action.event
                }
            };

        case DELETE_EVENT:
            newState = { ...state };
            delete newState.events[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default eventsReducer;
