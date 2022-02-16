import { api } from '@/graphql';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
