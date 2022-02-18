import { projectReducer } from '@/features/project/project.slice';
import { api } from '@/graphql';
import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    project: projectReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
