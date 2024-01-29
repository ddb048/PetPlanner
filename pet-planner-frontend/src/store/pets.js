import { csrfFetch } from './csrf';


//*******************TYPES*********************/
const LOAD_PETS = 'pets/LOAD_PETS';
const ADD_PET = 'pets/ADD_PET';
const EDIT_PET = 'pets/EDIT_PET';
const DELETE_PET = 'pets/DELETE_PET';
const LOAD_ONE_PET = 'pets/LOAD_ONE_PET';
const LOAD_PET_EVENTS = 'pets/LOAD_PET_EVENTS';

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

//*******************THUNKS*********************/
//GET all Users pets
export const getPets = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/pets`);
    const data = await response.json();
    dispatch(loadPets(data));
    return response;
};

//GET a single pet
export const getOnePet = (petId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}`);
    const data = await response.json();
    dispatch(loadOnePet(data));
    return response;
};

//POST a pet
export const createPet = (pet) => async (dispatch) => {
    const response = await csrfFetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet),
    });
    const data = await response.json();
    dispatch(addPet(data));
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
    dispatch(editPet(data));
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
    const data = await response.json();
    dispatch(loadPetEvents(data));
    return response;
}

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
            newState = { ...state };
            newState.pets[+action.pet.id] = action.pet;
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
            newState = { ...state };
            delete newState.pets[+action.petId];
            return newState;

        case LOAD_PET_EVENTS:
            newState = { ...state };
            newState.pets = { ...state.pets };
            newState.OnePet = { ...state.OnePet };
            newState.OnePet.events = {};
            action.events.forEach((event) => {
                newState.OnePet.events[+event.id] = event;
            });
            return newState;
        default:
            return state;

    }
};

export default petsReducer;
