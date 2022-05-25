import { api as generatedApi, AttributeType } from '@/graphql';

const attributesTagsTypes = Object.values(AttributeType).map((type) => `${type}Attribute`);

export const enhanceAttributesApi: Parameters<typeof generatedApi['enhanceEndpoints']>[0] = {
    addTagTypes: attributesTagsTypes,
    endpoints: {
        attribute: {
            providesTags: (result, error, { id, type }) => [{ type: `${type}Attribute`, id }],
        },
        attributes: {
            providesTags: (result, error, { type }) =>
                result?.attributes
                    ? [
                          ...result.attributes.map(({ id }) => ({
                              type: `${type}Attribute` as const,
                              id,
                          })),
                          { type: `${type}Attribute`, id: 'LIST' },
                      ]
                    : [{ type: `${type}Attribute`, id: 'LIST' }],
        },
        createAttribute: {
            invalidatesTags: (result, error, { input: { type } }) => [
                { type: `${type}Attribute`, id: 'LIST' },
            ],
        },
        updateAttribute: {
            invalidatesTags: (result, error, { input: { id, type } }) => [
                { type: `${type}Attribute`, id },
                { type: `${type}Attribute`, id: 'LIST' },
            ],
        },
        updateAttributesOrder: {
            invalidatesTags: (result, error, { input: { type } }) => [
                { type: `${type}Attribute`, id: 'LIST' },
            ],
        },
        deleteAttribute: {
            invalidatesTags: (result, error, { input: { id, type } }) => [
                { type: `${type}Attribute`, id },
                { type: `${type}Attribute`, id: 'LIST' },
            ],
        },
    },
};
