import { useUser } from '@/shared/hooks';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute: FC = () => {
    const { isAdmin } = useUser();

    if (!isAdmin) return <Navigate to={'projects'} />;

    return <Outlet />;
};
