import { AuthWidget } from '@/features/auth';
import { Layout, Row } from 'antd';
import { FC } from 'react';
import { AppNavigation } from '.';

const { Header } = Layout;

export const AppHeader: FC = () => {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Row wrap={false} justify="space-between">
                <AppNavigation />
                <AuthWidget />
            </Row>
        </Header>
    );
};
