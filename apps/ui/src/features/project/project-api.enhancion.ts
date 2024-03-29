import { api as generatedApi } from '@/graphql';

export const PROJECT_API_TAG = 'Project';

export const enhanceProjectsApi: Parameters<typeof generatedApi['enhanceEndpoints']>[0] = {
    addTagTypes: [PROJECT_API_TAG],
    endpoints: {
        project: {
            providesTags: (result, error, { id }) => [{ type: PROJECT_API_TAG, id }],
        },
        projects: {
            providesTags: (result) =>
                result?.projects.page.edges
                    ? [
                          ...result.projects.page.edges.map(({ node }) => ({
                              type: `${PROJECT_API_TAG}` as const,
                              id: node!.id,
                          })),
                          { type: PROJECT_API_TAG, id: 'LIST' },
                      ]
                    : [{ type: PROJECT_API_TAG, id: 'LIST' }],
        },
        createProject: {
            invalidatesTags: [{ type: PROJECT_API_TAG, id: 'LIST' }],
        },
        updateProject: {
            invalidatesTags: (result, error, { updateProjectInput: { id } }) => [
                // { type: PROJECT_API_TAG, id },
                { type: PROJECT_API_TAG, id: 'LIST' },
            ],
            onQueryStarted: async ({ updateProjectInput: { id } }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { updateProject },
                    } = await queryFulfilled;

                    dispatch(
                        generatedApi.util.updateQueryData('project', { id }, (draft) => {
                            draft.project = { ...draft.project, ...updateProject };
                        })
                    );
                } catch {}
            },
        },
		deleteProject: {
            invalidatesTags: [{ type: PROJECT_API_TAG, id: 'LIST' }],
        },
        addProjectComment: {
            onQueryStarted: async ({ projectCommentInput: { projectId } }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { addProjectComment: comment },
                    } = await queryFulfilled;
                    dispatch(
                        generatedApi.util.updateQueryData('project', { id: projectId }, (draft) => {
                            draft.project.comments = [...(draft.project.comments || []), comment];
                        })
                    );
                } catch {}
            },
        },
        updateProjectComment: {
            onQueryStarted: async ({ id, text }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { updateProjectComment: comment },
                    } = await queryFulfilled;
                    dispatch(
                        generatedApi.util.updateQueryData('project', { id: comment.projectId }, (draft) => {
                            if (draft.project.comments?.length) {
                                const idx = draft.project.comments.findIndex(
                                    (_comm) => _comm.id === comment.id
                                );
                                draft.project.comments![idx] = comment;
                            }
                        })
                    );
                } catch {}
            },
        },
        deleteProjectComment: {
            onQueryStarted: async ({ id, projectId }, { dispatch, queryFulfilled }) => {
                try {
                    const {
                        data: { deleteProjectComment },
                    } = await queryFulfilled;
                    if (deleteProjectComment) {
                        dispatch(
                            generatedApi.util.updateQueryData('project', { id: projectId }, (draft) => {
                                if (draft.project.comments?.length) {
                                    const idx = draft.project.comments.findIndex((_comm) => _comm.id === id);
                                    draft.project.comments.splice(idx, 1);
                                }
                            })
                        );
                    }
                } catch {}
            },
        },
    },
};
