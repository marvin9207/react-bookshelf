import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import booksReducer from './booksSlice';
import watcherSaga from './sagas/rootSaga';

//using the latest recommendation from react-redux. It will simplifies the store setup,
//since it handles createStore, actions, middlewares, combineReducers, etc automatically 
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({ 
    reducer: {
        books: booksReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;