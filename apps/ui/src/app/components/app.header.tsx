import { AuthWidget } from '@/features/auth';
import { Layout, Row } from 'antd';
import { FC } from 'react';
import { AppNavigation } from '.';

const { Header } = Layout;

export const AppHeader: FC = () => {
  return (
    <Header>
      <Row wrap={false} justify="space-between">
        <AppNavigation />
        <AuthWidget />
      </Row>
    </Header>
  );
};
