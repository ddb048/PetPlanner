import { csrfFetch } from './csrf';


//*******************TYPES*********************/
const LOAD_PETS = 'pets/LOAD_PETS';
const ADD_PET = 'pets/ADD_PET';
const EDIT_PET = 'pets/EDIT_PET';
const DELETE_PET = 'pets/DELETE_PET';
const LOAD_ONE_PET = 'pets/LOAD_ONE_PET';

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

//*******************THUNKS*********************/
//GET all pets
export const getPets = () => async (dispatch) => {
    const response = await csrfFetch('/api/pets');
    const data = await response.json();
    dispatch(loadPets(data.pets));
    return response;
};

//GET a single pet
export const getOnePet = (petId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pets/${petId}`);
    const data = await response.json();
    dispatch(loadOnePet(data.pet));
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
    dispatch(addPet(data.pet));
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
    dispatch(editPet(data.pet));
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
                newState.pets[pet.id] = pet;
            });
            return newState;
        case LOAD_ONE_PET:
            newState.pets = { ...state.pets, [action.pet.id]: action.pet };
            newState.OnePet = { ...action.pet };
            return newState;
        case ADD_PET:
            newState = { ...state };
            newState.pets[action.pet.id] = action.pet;
            return newState;
        case EDIT_PET:
            newState = { ...state };
            newState.pets[action.pet.id] = action.pet;
            return newState;
        case DELETE_PET:
            newState = { ...state };
            delete newState.pets[action.petId];
            return newState;
        default:
            return state;

    }
};

export default petsReducer;
