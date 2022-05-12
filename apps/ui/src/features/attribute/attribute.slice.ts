import { AttributeType } from '@/graphql';
import { createSlice } from '@reduxjs/toolkit';

type AttributeState = {
    editInfo: { id?: number; type?: AttributeType };
};

const attributeSlice = createSlice({
    name: 'attribute',
    initialState: { editInfo: {} } as AttributeState,
    reducers: {
        setEditInfo: (state, action) => {
            state.editInfo.id = action.payload?.id || undefined;
            state.editInfo.type = action.payload?.type || undefined;
        },
    },
});

export const attributeReducer = attributeSlice.reducer;
export const { setEditInfo } = attributeSlice.actions;
