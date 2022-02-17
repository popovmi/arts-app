import { useWhoAmIQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute: FC = () => {
    const { isError, isLoading } = useWhoAmIQuery();

    if (isLoading) return <CenteredSpin />;

    if (isError) return <Navigate to={'/login'} />;

    return <Outlet />;
};
