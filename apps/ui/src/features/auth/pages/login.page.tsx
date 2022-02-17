import { MutationLoginArgs, useLoginMutation, useWhoAmIQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Item } = Form;
const { Password } = Input;

export const LoginPage: FC = () => {
    const location = useLocation();
    const locState: any = location.state;

    const navigateTo = (locState?.from?.pathname.indexOf('update') < 0 && locState?.from?.pathname) || '/projects';
    const navigate = useNavigate();

    const [tryAuthenticate, { isError, error, isLoading }] = useLoginMutation({ fixedCacheKey: 'auth' });
    const { isSuccess, refetch } = useWhoAmIQuery();

    useEffect(() => {
        if (isSuccess) {
            navigate(navigateTo);
        }
    }, [isSuccess]);

    if (isLoading) return <CenteredSpin />;

    const onFinish = async (values: MutationLoginArgs) => {
        tryAuthenticate({ ...values }).then((result) => {
            'data' in result && refetch();
        });
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col xs={18} sm={8} md={6} xl={4}>
                <Form name="loginForm" onFinish={onFinish}>
                    <Item name="username" rules={[{ required: true, message: 'Введите логин!' }]}>
                        <Input placeholder="Логин" />
                    </Item>
                    <Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
                        <Password placeholder="Пароль" />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" block={true}>
                            Вход
                        </Button>
                    </Item>
                    {isError && <Typography.Text type="danger">{error!.message}</Typography.Text>}
                </Form>
            </Col>
        </Row>
    );
};
