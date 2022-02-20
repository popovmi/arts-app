import { api as generatedApi } from '@/graphql';

export const api = generatedApi.enhanceEndpoints({
    addTagTypes: ['Art'],
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
    },
});
