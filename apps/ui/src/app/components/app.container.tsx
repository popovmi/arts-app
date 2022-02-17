import { useAppSelector } from '@/app/store';
import { AppTabs } from '@/features/tabs';
import { Layout } from 'antd';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppNavigation } from './app.navigation';

const { Content, Sider } = Layout;

export const AppContainer: FC = () => {
    const navigate = useNavigate();
    const { currentTabPath } = useAppSelector((state) => state.tabs);

    useEffect(() => {
        navigate(currentTabPath || '/');
    }, [currentTabPath]);

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
                <AppTabs />
                <Outlet />
            </Content>
        </Layout>
    );
};
