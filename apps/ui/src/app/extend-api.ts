import { api as generatedApi } from '@/graphql';

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['Art', 'Project'],
    endpoints: {
        art: {
            providesTags: (result, error, { id }) => [{ type: 'Art', id }],
        },
        arts: {
            providesTags: (result) =>
                result?.arts.page.edges
                    ? [
                          ...result.arts.page.edges.map(({ node }) => ({ type: 'Art' as const, id: node!.id })),
                          { type: 'Art', id: 'LIST' },
                      ]
                    : [{ type: 'Art', id: 'LIST' }],
        },
        createArt: {
            invalidatesTags: [{ type: 'Art', id: 'LIST' }],
        },
        updateArt: {
            invalidatesTags: (result, error, { updateArtInput: { id } }) => [{ type: 'Art', id }],
        },
        project: {
            providesTags: (result, error, { id }) => [{ type: 'Project', id }],
        },
        projects: {
            providesTags: (result) =>
                result?.projects.page.edges
                    ? [
                          ...result.projects.page.edges.map(({ node }) => ({
                              type: 'Project' as const,
                              id: node!.id,
                          })),
                          { type: 'Project', id: 'LIST' },
                      ]
                    : [{ type: 'Project', id: 'LIST' }],
        },
        createProject: {
            invalidatesTags: [{ type: 'Project', id: 'LIST' }],
        },
        updateProject: {
            invalidatesTags: (result, error, { updateProjectInput: { id } }) => [
                { type: 'Project', id },
                { type: 'Project', id: 'LIST' },
            ],
        },
    },
});
