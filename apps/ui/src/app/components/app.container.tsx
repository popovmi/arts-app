import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavigation } from './app.navigation';

const { Content, Sider } = Layout;

export const AppContainer: FC = () => {
  return (
    <Layout hasSider={true}>
      <Sider theme={'light'} collapsible={true} collapsedWidth={0} style={{ height: '100%' }}>
        <AppNavigation />
      </Sider>
      <Content style={{ paddingInline: 40 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
