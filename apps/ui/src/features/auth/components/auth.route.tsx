import { CenteredSpin } from '@/shared/components';
import { useUser } from '@/shared/hooks';
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthRoute: FC = () => {
  const location = useLocation();
  const { user, isLoading } = useUser();

  if (isLoading) return <CenteredSpin />;

  if (!user) return <Navigate to={{ pathname: '/login' }} state={{ from: location }} />;

  return <Outlet />;
};
