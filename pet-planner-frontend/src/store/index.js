import { configureStore } from '@reduxjs/toolkit';
//import { applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import eventsReducer from './events';
import petsReducer from './pets';
import sessionReducer from './session';


const reducer = {
    session: sessionReducer,
    pets: petsReducer,
    events: eventsReducer,
    // attendances: attendancesReducer,
};

//let enhancer;

//if (process.env.NODE_ENV === 'production') {
  //  enhancer = applyMiddleware(thunk);
//} else {
  //  const logger = require('redux-logger').default;
    //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    //enhancer = composeEnhancers(applyMiddleware(thunk, logger));
//}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
