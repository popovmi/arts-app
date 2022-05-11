import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

type FactorysState = {
    editFactoryId?: string;
    showCreateFactory?: boolean;
};

const factorySlice = createSlice({
    name: 'factory',
    initialState: {} as FactorysState,
    reducers: {
        setEditFactoryId: (state, action) => {
            state.editFactoryId = action.payload;
        },
        setShowCreateFactory: (state, action) => {
            state.showCreateFactory = action.payload;
        },
    },
});

export const factoryReducer = factorySlice.reducer;
export const { setEditFactoryId, setShowCreateFactory } = factorySlice.actions;

export const selectFactorys = (state: RootState) => {
    const { editFactoryId, showCreateFactory } = state.factory;

    return { editFactoryId, showCreateFactory };
};
