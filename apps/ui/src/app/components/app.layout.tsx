import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './app.header';

const { Content } = Layout;

export const AppLayout: FC = () => {
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
