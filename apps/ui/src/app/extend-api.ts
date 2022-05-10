import { api as generatedApi, AttributeType } from '@/graphql';

const attributesTags = Object.values(AttributeType).map(
  (type) => `${type}Attribute`
);

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [
    'Art',
    'Project',
    'User',
    'Customer',
    'Factory',
    ...attributesTags,
  ],
  endpoints: {
    art: {
      providesTags: (result, error, { id }) => [{ type: 'Art', id }],
    },
    arts: {
      providesTags: (result) =>
        result?.arts.page.edges
          ? [
              ...result.arts.page.edges.map(({ node }) => ({
                type: 'Art' as const,
                id: node!.id,
              })),
              { type: 'Art', id: 'LIST' },
            ]
          : [{ type: 'Art', id: 'LIST' }],
    },
    createArt: {
      invalidatesTags: [{ type: 'Art', id: 'LIST' }],
    },
    updateArt: {
      invalidatesTags: (result, error, { updateArtInput: { id } }) => [
        { type: 'Art', id },
      ],
    },
    addArtComment: {
      onQueryStarted: async (
        { artCommentInput: { artId } },
        { dispatch, queryFulfilled }
      ) => {
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

    user: {
      providesTags: (result, error, { id }) => [{ type: 'User', id }],
    },
    users: {
      providesTags: (result) =>
        result?.users.page.edges
          ? [
              ...result.users.page.edges.map(({ node }) => ({
                type: 'User' as const,
                id: node!.id,
              })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    },
    createUser: {
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    },
    updateUser: {
      invalidatesTags: (result, error, { updateUserInput: { id } }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    },

    customer: {
      providesTags: (result, error, { id }) => [{ type: 'Customer', id }],
    },
    customers: {
      providesTags: (result) =>
        result?.customers
          ? [
              ...result.customers.map(({ id }) => ({
                type: 'Customer' as const,
                id,
              })),
              { type: 'Customer', id: 'LIST' },
            ]
          : [{ type: 'Customer', id: 'LIST' }],
    },
    createCustomer: {
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    },
    updateCustomer: {
      invalidatesTags: (result, error, { input: { id } }) => [
        { type: 'Customer', id },
        { type: 'Customer', id: 'LIST' },
      ],
    },

    factory: {
      providesTags: (result, error, { id }) => [{ type: 'Factory', id }],
    },
    factories: {
      providesTags: (result) =>
        result?.factories
          ? [
              ...result.factories.map(({ id }) => ({
                type: 'Factory' as const,
                id,
              })),
              { type: 'Factory', id: 'LIST' },
            ]
          : [{ type: 'Factory', id: 'LIST' }],
    },
    createFactory: {
      invalidatesTags: [{ type: 'Factory', id: 'LIST' }],
    },
    updateFactory: {
      invalidatesTags: (result, error, { input: { id } }) => [
        { type: 'Factory', id },
        { type: 'Factory', id: 'LIST' },
      ],
    },

    attribute: {
      providesTags: (result, error, { id, type }) => [
        { type: `${type}Attribute`, id },
      ],
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
});
