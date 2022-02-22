import { Role, useWhoAmIQuery } from '@/graphql';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute: FC = () => {
  const { data } = useWhoAmIQuery();
  const isAdmin = data?.whoAmI?.role === Role.Admin;

  if (!isAdmin) return <Navigate to={'projects'} />;

  return <Outlet />;
};
