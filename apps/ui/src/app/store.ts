import { projectReducer } from '@/features/project/project.slice';
import { artReducer } from '@/features/art/art.slice';
import { userReducer } from '@/features/user/user.slice';
import { api } from '@/app/extend-api';
import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    project: projectReducer,
    art: artReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
    if (action['meta']?.arg?.endpointName !== 'whoAmI' && action['payload']?.data?.[0]?.status === 401) {
        message.error('Сессия истекла. Необходимо авторизоваться!');

        return appReducer({} as RootState, action);
    }

    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
