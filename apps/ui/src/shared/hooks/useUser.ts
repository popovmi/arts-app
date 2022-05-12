import { useWhoAmIQuery } from '@/graphql';

export const useUser = () => {
    const { data, isLoading, refetch } = useWhoAmIQuery();
    const user = data?.whoAmI || undefined;
    const isAdmin = user?.role === 'ADMIN';

    return { user, isAdmin, isLoading, refetch };
};
