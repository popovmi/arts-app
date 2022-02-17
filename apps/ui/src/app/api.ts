import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { DocumentNode } from 'graphql';
import { ClientError, GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('/graphql');

const baseQuery = graphqlRequestBaseQuery({ client: client as any });

const baseQueryWithReauth = async (
    args: { document: string | DocumentNode; variables: any },
    api: BaseQueryApi,
    extraOptions: Partial<Pick<ClientError, 'request' | 'response'>>
) => {
    try {
        const result = await baseQuery(args, api, extraOptions);

        return result;
    } catch (error) {
        if (error instanceof ClientError) {
            return {
                error: {
                    status: error.response.status,
                    message: error.response?.errors?.[0]?.message || 'Неизвестная ошибка',
                    data: error.response?.errors,
                },
            };
        }

        return { error: { status: 500, message: 'Неизвестная ошибка', data: error } };
    }
};

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
