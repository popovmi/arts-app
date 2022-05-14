import { api as generatedApi } from '@/graphql';

export const FACTORY_API_TAG = 'Factory';

export const enhanceFactoriesApi = (api: typeof generatedApi) => {
    return api.enhanceEndpoints({
        addTagTypes: [FACTORY_API_TAG],
        endpoints: {
            factory: {
                providesTags: (result, error, { id }) => [{ type: FACTORY_API_TAG, id }],
            },
            factories: {
                providesTags: (result) =>
                    result?.factories
                        ? [
                              ...result.factories.map(({ id }) => ({
                                  type: `${FACTORY_API_TAG}` as const,
                                  id,
                              })),
                              { type: FACTORY_API_TAG, id: 'LIST' },
                          ]
                        : [{ type: FACTORY_API_TAG, id: 'LIST' }],
            },
            createFactory: {
                invalidatesTags: [{ type: FACTORY_API_TAG, id: 'LIST' }],
            },
            updateFactory: {
                invalidatesTags: (result, error, { input: { id } }) => [
                    { type: FACTORY_API_TAG, id },
                    { type: FACTORY_API_TAG, id: 'LIST' },
                ],
            },
        },
    });
};
