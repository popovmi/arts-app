import { enhanceArtsApi } from '@/features/art';
import { enhanceAttributesApi } from '@/features/attribute';
import { enhanceCustomersApi } from '@/features/customer';
import { enhanceFactoriesApi } from '@/features/factory';
import { enhanceProjectsApi } from '@/features/project';
import { enhanceUsersApi } from '@/features/user';
import { api as generatedApi } from '@/graphql';

const enhancions = [
    enhanceArtsApi,
    enhanceProjectsApi,
    enhanceUsersApi,
    enhanceAttributesApi,
    enhanceCustomersApi,
    enhanceFactoriesApi,
];

let api: any;

enhancions.forEach((enhancion) => (api = enhancion(api === undefined ? generatedApi : api)));

export { api };
