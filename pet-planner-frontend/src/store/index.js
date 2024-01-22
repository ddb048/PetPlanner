import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { attendancesReducer } from './attendances';
import { eventsReducer } from './events';
import { petsReducer } from './pets';
import sessionReducer from './session';


const rootReducer = combineReducers({
    session: sessionReducer,
    pets: petsReducer,
    events: eventsReducer,
    attendances: attendancesReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
