import { RootState } from '@/app/store';
import { ConnectionArgs, User, UserFilterQuery, UserOrderQuery, UserResponse, UserTypeEdge } from '@/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
    data: UserTypeEdge[];
    filter: UserFilterQuery;
    order: UserOrderQuery;
    pagination: ConnectionArgs;
    hasMore: boolean;
    doFetch: boolean;
    editUserId?: string;
    showCreateUser?: boolean;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        filter: {},
        order: {},
        pagination: { first: 50 },
        hasMore: true,
        doFetch: true,
    } as UsersState,
    reducers: {
        usersLoaded: (state, action: PayloadAction<UserResponse>) => {
            const data = action.payload.page?.edges || [];
            const lastItem = data?.[data?.length - 1];
            const partial = !!(state.pagination?.after || state.pagination?.before);

            state.pagination.after = lastItem?.cursor || '';
            state.data = partial ? [...state.data, ...data] : data;
            state.hasMore = action.payload.page.pageInfo?.hasNextPage || false;
            state.doFetch = false;
        },
        updateFilter: (state, action: PayloadAction<UserFilterQuery & { shouldFetch: boolean }>) => {
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
        setEditUserId: (state, action) => {
            state.editUserId = action.payload;
        },
        setShowCreateUser: (state, action) => {
            state.showCreateUser = action.payload;
        },
        userCreated: (state) => {
            state.filter = {};
            state.pagination.before = null;
            state.pagination.after = null;
            state.doFetch = true;
            state.showCreateUser = false;
        },
    },
});

export const userReducer = userSlice.reducer;
export const {
    usersLoaded,
    updateFilter,
    shouldFetch,
    clearFilter,
    setEditUserId,
    setShowCreateUser,
    userCreated,
} = userSlice.actions;

export const selectUsers = (state: RootState) => {
    const { data, filter, hasMore, order, pagination, doFetch, editUserId, showCreateUser } = state.user;
    const users: User[] = data!.map((edge) => edge!.node!);

    return { users, filter, hasMore, order, pagination, doFetch, editUserId, showCreateUser };
};
