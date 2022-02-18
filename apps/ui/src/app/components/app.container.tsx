import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavigation } from './app.navigation';

const { Content, Sider } = Layout;

export const AppContainer: FC = () => {
    return (
        <Layout hasSider={true}>
            <Sider
                theme={'light'}
                collapsible={true}
                collapsedWidth={0}
                breakpoint={'sm'}
                style={{ height: '100%' }}
            >
                <AppNavigation />
            </Sider>
            <Content style={{ paddingLeft: 40 }}>
                <Outlet />
            </Content>
        </Layout>
    );
};
