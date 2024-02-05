import { csrfFetch } from './csrf';


//*******************TYPES*********************/
const LOAD_PETS = 'pets/LOAD_PETS';
const ADD_PET = 'pets/ADD_PET';
const EDIT_PET = 'pets/EDIT_PET';
const DELETE_PET = 'pets/DELETE_PET';
const LOAD_ONE_PET = 'pets/LOAD_ONE_PET';
const LOAD_PET_EVENTS = 'pets/LOAD_PET_EVENTS';
const SET_ERROR = 'pets/setError';

//*******************ACTION CREATORS*********************/
const loadPets = (pets) => {
    return {
        type: LOAD_PETS,
        pets,
    };
};

const addPet = (pet) => {
    return {
        type: ADD_PET,
        pet,
    };
};

const editPet = (pet) => {
    return {
        type: EDIT_PET,
        pet,
    };
};

const deletePet = (petId) => {
    return {
        type: DELETE_PET,
        petId,
    };
};

const loadOnePet = (pet) => {
    return {
        type: LOAD_ONE_PET,
        pet,
    };
}

const loadPetEvents = (events) => {
    return {
        type: LOAD_PET_EVENTS,
        events,
    };
}

// Set an ERROR
const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

//*******************THUNKS*********************/
//GET all Users pets
export const getPets = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/pets`);
    const data = await response.json();
    //console.log("data from getPets", data.data);
    dispatch(loadPets(data.data));
    return response;
};

//GET a single pet
export const getOnePet = (petId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}`);
    const data = await response.json();
    //console.log("data from getOnePet", data);
    dispatch(loadOnePet(data.data));
    return response;
};

//POST a pet
export const createPet = (pet) => async (dispatch) => {
    const response = await csrfFetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet),
    });

    if (response.ok) {
        const data = await response.json();
        //console.log("data from attempt to create pet", data);
        dispatch(addPet(data.data));
    } else {
        console.log("Error in createPet:", response.message);
    }

    return response;
}

//PUT a pet (edit)
export const updatePet = (pet) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${pet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet),
    });
    const data = await response.json();
    dispatch(editPet(data.data));
    return response;
}

//DELETE a pet
export const removePet = (petId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}`, {
        method: 'DELETE',
    });
    dispatch(deletePet(petId));
    return response;
}

//GET all events for a pet
export const getPetEvents = (petId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}/events`);
    console.log('response in thunk get pet Events', response);

    if (response.ok) {
        const data = await response.json();
        console.log('data in thunk get pet Events', data);

        // Dispatch with an empty array if there are no events
        dispatch(loadPetEvents(data.data || []));
        return response;
    } else {
        // Handle error or dispatch another action to indicate failure
        console.log('Error fetching events');
    }
};

//*******************REDUCER*********************/
const initialState = {
    pets: {},
    OnePet: {}
};

const petsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_PETS:
            newState = { ...state }
            newState.pets = {};
            action.pets.forEach((pet) => {
                newState.pets[+pet.id] = pet;
            });
            return newState;
        case LOAD_ONE_PET:
            newState = { ...state};
            newState.OnePet = { ...action.pet };
            return newState;
        case ADD_PET:
            newState = {
                ...state,
                pets: {
                    ...state.pets,
                    [action.pet.id]: action.pet
                }
            };
            return newState;
        case EDIT_PET:
            return {
                ...state,
                pets: {
                    ...state.pets,
                    pets: {
                        ...state.pets.pets,
                        [action.pet.id]: action.pet
                    }
                }
            };
        case DELETE_PET:
            const { [action.petId]: deletedPet, ...remainingPets } = state.pets;

            return {
                ...state,
                pets: remainingPets,
                OnePet: {}
            };

        case LOAD_PET_EVENTS:
            newState = { ...state };
            newState.pets = { ...state.pets };
            newState.OnePet = { ...state.OnePet };
            newState.OnePet.events = {};
            action.events.forEach((event) => {
                newState.OnePet.events[+event.id] = event;
            });
            return newState;
        case SET_ERROR:
            newState = Object.assign({}, state, { error: action.payload });
            return newState;
        default:
            return state;

    }
};

export default petsReducer;
