import { AuthWidget } from '@/features/auth';
import { Layout, Row } from 'antd';
import { FC } from 'react';

const { Header } = Layout;

export const AppHeader: FC = () => {
    return (
        <Header>
            {/* <Row wrap={false} justify="end"> */}
                <AuthWidget />
            {/* </Row> */}
        </Header>
    );
};
