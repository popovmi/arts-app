import { api as generatedApi } from '@/graphql';

export const ART_API_TAG = 'Art';

export const enhanceArtsApi: Parameters<typeof generatedApi['enhanceEndpoints']>[0] = {
    addTagTypes: [ART_API_TAG],
    endpoints: {
        art: {
            providesTags: (result, error, { id }) => [{ type: ART_API_TAG, id }],
        },
        arts: {
            providesTags: (result) =>
                result?.arts.page.edges
                    ? [
                          ...result.arts.page.edges.map(({ node }) => ({
                              type: `${ART_API_TAG}` as const,
                              id: node!.id,
                          })),
                          { type: ART_API_TAG, id: 'LIST' },
                      ]
                    : [{ type: ART_API_TAG, id: 'LIST' }],
        },
        createArt: {
            invalidatesTags: [{ type: ART_API_TAG, id: 'LIST' }],
        },
        updateArt: {
            invalidatesTags: (result, error, { updateArtInput }) => {
                return [
                    { type: ART_API_TAG, id: 'LIST' },
                    { type: 'Project' as never, id: updateArtInput.projectId || undefined },
                ];
            },
            onQueryStarted: async ({ updateArtInput: { id } }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { updateArt },
                    } = await queryFulfilled;

                    dispatch(
                        generatedApi.util.updateQueryData('art', { id }, (draft) => {
                            draft.art = { ...draft.art, ...updateArt };
                        })
                    );
                } catch {}
            },
        },
        addArtComment: {
            onQueryStarted: async ({ artCommentInput: { artId } }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { addArtComment: comment },
                    } = await queryFulfilled;
                    dispatch(
                        generatedApi.util.updateQueryData('art', { id: artId }, (draft) => {
                            draft.art.comments = [...(draft.art.comments || []), comment];
                        })
                    );
                } catch {}
            },
        },
        updateArtComment: {
            onQueryStarted: async ({ id, text }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { updateArtComment: comment },
                    } = await queryFulfilled;
                    dispatch(
                        generatedApi.util.updateQueryData('art', { id: comment.artId }, (draft) => {
                            if (draft.art.comments?.length) {
                                const idx = draft.art.comments.findIndex((_comm) => _comm.id === comment.id);
                                draft.art.comments![idx] = comment;
                            }
                        })
                    );
                } catch {}
            },
        },
    },
};
