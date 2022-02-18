import { RootState } from '@/app/store';
import { ArtFilterQuery, ArtOrderQuery, ConnectionArgs, ArtTypeEdge, ArtResponse, Art } from '@/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ArtsState = {
    data: ArtTypeEdge[];
    filter: ArtFilterQuery;
    order: ArtOrderQuery;
    pagination: ConnectionArgs;
    hasMore: boolean;
    doFetch: boolean;
};

const artSlice = createSlice({
    name: 'art',
    initialState: {
        data: [],
        filter: {},
        order: {},
        pagination: { first: 50 },
        hasMore: true,
        doFetch: true,
    } as ArtsState,
    reducers: {
        artsLoaded: (state, action: PayloadAction<ArtResponse>) => {
            const data = action.payload.page?.edges || [];
            const lastItem = data?.[data?.length - 1];
            const partial = !!(state.pagination?.after || state.pagination?.before);

            state.pagination.after = lastItem?.cursor || '';
            state.data = partial ? [...state.data, ...data] : data;
            state.hasMore = action.payload.page.pageInfo?.hasNextPage || false;
            state.doFetch = false;
        },
        updateFilter: (state, action: PayloadAction<ArtFilterQuery & { shouldFetch: boolean }>) => {
            const { shouldFetch, ...payload } = action.payload;
            let filter = state.filter;

            filter = { ...filter, ...payload };

            state.filter = filter;
            state.pagination.before = null;
            state.pagination.after = null;
            if (shouldFetch === true) {
                state.doFetch = true;
            }
        },
        clearFilter: (state) => {
            state.filter = {};
            state.pagination.before = null;
            state.pagination.after = null;
            state.doFetch = true;
        },

        shouldFetch: (state, action) => {
            state.doFetch = action.payload;
        },
    },
});

export const artReducer = artSlice.reducer;
export const { artsLoaded, updateFilter, shouldFetch, clearFilter } = artSlice.actions;

export const selectArts = (state: RootState) => {
    const { data, filter, hasMore, order, pagination, doFetch } = state.art;
    const arts: Art[] = data!.map((edge) => edge!.node!);

    return { arts, filter, hasMore, order, pagination, doFetch };
};
