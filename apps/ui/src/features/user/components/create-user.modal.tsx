import { useAppDispatch, useAppSelector } from '@/app/store';
import { CreateUserInput, useCreateUserMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Spin, Typography } from 'antd';
import { FC } from 'react';
import { selectUsers, setShowCreateUser, userCreated } from '../user.slice';

const { Item } = Form;
const { Text } = Typography;
const { Password } = Input;

export const CreateUserModal: FC = () => {
    const dispatch = useAppDispatch();
    const { showCreateUser } = useAppSelector(selectUsers);
    const [createUser, { isLoading, error, isError, reset }] = useCreateUserMutation({
        fixedCacheKey: 'createUser',
    });
    const [form] = Form.useForm<CreateUserInput>();
    const onFormFinish = async () => {
        const createUserInput = await form.validateFields();

        createUser({ createUserInput }).then((res) => {
            if ('data' in res) {
                dispatch(userCreated());
                form.resetFields();
            }
        });
    };

    return (
        <Modal
            title="Новый пользователь"
            visible={showCreateUser}
            onOk={onFormFinish}
            onCancel={() => dispatch(setShowCreateUser(false))}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="newUser"
                form={form}
                labelAlign="left"
            >
                <Spin spinning={isLoading}>
                    <Item label="Логин" name="username" rules={[{ required: true, message: 'Обязательно!' }]}>
                        <Input />
                    </Item>
                    <Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Обязательно!' }]}
                    >
                        <Password />
                    </Item>
                    <Item
                        label="Полное имя"
                        name="fullName"
                        rules={[{ required: true, message: 'Обязательно!' }]}
                    >
                        <Input />
                    </Item>
                </Spin>
                {isError && (
                    <Space>
                        <Text type="danger">{error?.message}</Text>
                        <Button size="small" type="link" danger icon={<CloseOutlined />} onClick={reset} />
                    </Space>
                )}
            </Form>
        </Modal>
    );
};
