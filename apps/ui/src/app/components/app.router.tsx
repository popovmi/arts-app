import { ArtPage, ArtsListPage, CreateArtPage } from '@/features/art';
import { AttributePage } from '@/features/attribute';
import { AdminRoute, AuthRoute, LoginPage, PasswordUpdatePage } from '@/features/auth';
import { CompanyPage } from '@/features/company';
import { CreateProjectPage, ProjectPage, ProjectsListPage } from '@/features/project';
import { UsersListPage } from '@/features/user';
import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { AppLayout } from './app.layout';

export const AppRouter: FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <AppLayout />,
            children: [
                { path: '/login', element: <LoginPage /> },
                {
                    path: '/',
                    element: <AuthRoute />,
                    children: [
                        {
                            path: '/',
                            children: [
                                { path: 'update', element: <PasswordUpdatePage /> },
                                {
                                    path: 'projects',
                                    children: [
                                        { index: true, element: <ProjectsListPage /> },
                                        { path: 'create', element: <CreateProjectPage /> },
                                        { path: ':projectId', element: <ProjectPage /> },
                                    ],
                                },
                                {
                                    path: 'arts',
                                    children: [
                                        { index: true, element: <ArtsListPage /> },
                                        { path: 'create', element: <CreateArtPage /> },
                                        { path: ':artId', element: <ArtPage /> },
                                    ],
                                },
                                {
                                    path: 'admin',
                                    element: <AdminRoute />,
                                    children: [
                                        {
                                            path: 'users',
                                            element: <UsersListPage />,
                                        },
                                        {
                                            path: 'companies',
                                            element: <CompanyPage />,
                                        },
                                        {
                                            path: 'attributes',
                                            element: <AttributePage />,
                                        },
                                    ],
                                },
                                { path: '*', element: <Navigate to={'/projects'} /> },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    return <>{useRoutes(routes)}</>;
};
