import { enhanceArtsApi } from '@/features/art';
import { enhanceAttributesApi } from '@/features/attribute';
import { enhanceCustomersApi } from '@/features/customer';
import { enhanceFactoriesApi } from '@/features/factory';
import { enhanceProjectsApi } from '@/features/project';
import { enhanceUsersApi } from '@/features/user';
import { api as generatedApi } from '@/graphql';

const enhancions = [
    enhanceProjectsApi,
    enhanceArtsApi,
    enhanceUsersApi,
    enhanceAttributesApi,
    enhanceCustomersApi,
    enhanceFactoriesApi,
];

const addTagTypes = enhancions.reduce((_tags: string[], enhancion) => {
    return [..._tags, ...(enhancion.addTagTypes || [])];
}, []);

const endpoints = enhancions.reduce(
    (_endpoints: Parameters<typeof generatedApi['enhanceEndpoints']>[0]['endpoints'], enhancion) => {
        return { ..._endpoints, ...(enhancion.endpoints || {}) };
    },
    {}
);

generatedApi.enhanceEndpoints({
    addTagTypes,
    endpoints,
});

export { generatedApi as api };
