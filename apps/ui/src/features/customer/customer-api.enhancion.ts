import { api as generatedApi } from '@/graphql';

export const CUSTOMER_API_TAG = 'Customer';

export const enhanceCustomersApi = (api: typeof generatedApi) => {
    return api.enhanceEndpoints({
        addTagTypes: [CUSTOMER_API_TAG],
        endpoints: {
            customer: {
                providesTags: (result, error, { id }) => [{ type: CUSTOMER_API_TAG, id }],
            },
            customers: {
                providesTags: (result) =>
                    result?.customers
                        ? [
                              ...result.customers.map(({ id }) => ({
                                  type: `${CUSTOMER_API_TAG}` as const,
                                  id,
                              })),
                              { type: CUSTOMER_API_TAG, id: 'LIST' },
                          ]
                        : [{ type: CUSTOMER_API_TAG, id: 'LIST' }],
            },
            createCustomer: {
                invalidatesTags: [{ type: CUSTOMER_API_TAG, id: 'LIST' }],
            },
            updateCustomer: {
                invalidatesTags: (result, error, { input: { id } }) => [
                    { type: CUSTOMER_API_TAG, id },
                    { type: CUSTOMER_API_TAG, id: 'LIST' },
                ],
            },
        },
    });
};
