import { RootState } from '@/app/store';
import {
    ProjectFilterQuery,
    ProjectOrderQuery,
    ConnectionArgs,
    ProjectTypeEdge,
    ProjectResponse,
    Project,
} from '@/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProjectsState = {
    data: ProjectTypeEdge[];
    filter: ProjectFilterQuery;
    order: ProjectOrderQuery;
    pagination: ConnectionArgs;
    hasMore: boolean;
    doFetch: boolean;
};

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        data: [],
        filter: {},
        order: {},
        pagination: { first: 50 },
        hasMore: true,
        doFetch: true,
    } as ProjectsState,
    reducers: {
        projectsLoaded: (state, action: PayloadAction<ProjectResponse>) => {
            const data = action.payload.page?.edges || [];
            const lastItem = data?.[data?.length - 1];
            const partial = !!(state.pagination?.after || state.pagination?.before);

            state.pagination.after = lastItem?.cursor || '';
            state.data = partial ? [...state.data, ...data] : data;
            state.hasMore = action.payload.page.pageInfo?.hasNextPage || false;
            state.doFetch = false;
        },
        updateFilter: (state, action: PayloadAction<ProjectFilterQuery & { shouldFetch: boolean }>) => {
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

        shouldFetch: (state, action) => {
            state.doFetch = action.payload;
        },
    },
});

export const projectReducer = projectSlice.reducer;
export const { projectsLoaded, updateFilter, shouldFetch } = projectSlice.actions;

export const selectProjects = (state: RootState) => {
    const { data, filter, hasMore, order, pagination, doFetch } = state.project;
    const projects: Project[] = data!.map((edge) => edge!.node!);

    return { projects, filter, hasMore, order, pagination, doFetch };
};
