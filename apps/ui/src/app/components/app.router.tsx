import { ArtPage, ArtsListPage, ArtsPage, CreateArtPage } from '@/features/art';
import { AdminRoute, AuthRoute, LoginPage, PasswordUpdatePage } from '@/features/auth';
import { ProjectPage, ProjectsListPage, ProjectsPage } from '@/features/project';
import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { AppContainer } from './app.container';
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
                            element: <AppContainer />,
                            children: [
                                { path: 'update', element: <PasswordUpdatePage /> },
                                {
                                    path: 'projects',
                                    element: <ProjectsPage />,
                                    children: [
                                        { index: true, element: <ProjectsListPage /> },
                                        //   { path: 'create', element: <CreateProjectPage /> },
                                        { path: ':projectId', element: <ProjectPage /> },
                                    ],
                                },
                                {
                                    path: 'arts',
                                    element: <ArtsPage />,
                                    children: [
                                        { index: true, element: <ArtsListPage /> },
                                        { path: 'create', element: <CreateArtPage /> },
                                        { path: ':projectId', element: <ArtPage /> },
                                    ],
                                },
                                {
                                    path: 'admin',
                                    element: <AdminRoute />,
                                    children: [
                                        {
                                            path: 'users',
                                            element: <>users</>,
                                        },
                                        {
                                            path: 'companies',
                                            element: <>companies</>,
                                        },
                                        {
                                            path: 'attributes',
                                            element: <>attributes</>,
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
