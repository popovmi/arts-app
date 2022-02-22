import { MutationChangePasswordArgs, useChangePasswordMutation, useWhoAmIQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Button, Form, Input, Row, Typography } from 'antd';

const { Item } = Form;
const { Password } = Input;

export const PasswordUpdatePage = () => {
  const { data, refetch } = useWhoAmIQuery();
  const user = data?.whoAmI;
  const [updatePassword, { isLoading, isError, error }] = useChangePasswordMutation();

  if (isLoading) return <CenteredSpin />;

  const onFinish = async (values: MutationChangePasswordArgs) => {
    updatePassword({ ...values, username: user?.username || '' }).then(
      (result) => 'data' in result && refetch()
    );
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Form name="restForm" onFinish={onFinish}>
        <Item name="password" rules={[{ required: true, message: 'Введите старый пароль!' }]}>
          <Password placeholder="Старый пароль" />
        </Item>
        <Item name="passwordRepeat" rules={[{ required: true, message: 'Повторите старый пароль!' }]}>
          <Password placeholder="Старый пароль" />
        </Item>
        <Item name="newPassword" rules={[{ required: true, message: 'Повторите старый пароль!' }]}>
          <Password placeholder="Новый пароль" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Сменить
          </Button>
        </Item>
        {isError && <Typography.Text type="danger">{error!.message}</Typography.Text>}
      </Form>
    </Row>
  );
};
