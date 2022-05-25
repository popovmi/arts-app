import { api as generatedApi } from '@/graphql';

export const USER_API_TAG = 'User';

export const enhanceUsersApi: Parameters<typeof generatedApi['enhanceEndpoints']>[0] = {
    addTagTypes: [USER_API_TAG],
    endpoints: {
        user: {
            providesTags: (result, error, { id }) => [{ type: USER_API_TAG, id }],
        },
        users: {
            providesTags: (result) =>
                result?.users.page.edges
                    ? [
                          ...result.users.page.edges.map(({ node }) => ({
                              type: `${USER_API_TAG}` as const,
                              id: node!.id,
                          })),
                          { type: USER_API_TAG, id: 'LIST' },
                      ]
                    : [{ type: USER_API_TAG, id: 'LIST' }],
        },
        createUser: {
            invalidatesTags: [{ type: USER_API_TAG, id: 'LIST' }],
        },
        updateUser: {
            invalidatesTags: (result, error, { updateUserInput: { id } }) => [
                { type: USER_API_TAG, id },
                { type: USER_API_TAG, id: 'LIST' },
            ],
        },
    },
};
