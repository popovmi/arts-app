import { useAppDispatch, useAppSelector } from '@/app/store';
import { UpdateUserInput, useUpdateUserMutation, useUserQuery } from '@/graphql';
import { Checkbox, Form, Input, Modal, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { clearFilter, setEditUserId } from '..';

const { Item, useForm } = Form;
const { Password } = Input;

export const UpdateUserModal: FC = () => {
    const dispatch = useAppDispatch();
    const { editUserId } = useAppSelector((state) => state.user);
    const { data: userData, isLoading, isFetching } = useUserQuery({ id: editUserId! }, { skip: !editUserId });
    const user = userData?.user;
    const [update, { reset, isError, error, isLoading: isUpdating }] = useUpdateUserMutation();
    const [form] = useForm<UpdateUserInput>();

    useEffect(() => {
        form.resetFields();
    }, [user]);

    const onOk = async () => {
        const values = await form.validateFields();

        update({ updateUserInput: { ...values, id: user!.id } }).then((res) => {
            if ('data' in res) {
                form.resetFields();
                reset();
                dispatch(setEditUserId(null));
                dispatch(clearFilter());
            }
        });
    };

    const loading = isLoading || isFetching || isUpdating;

    return (
        <Modal
            visible={!!editUserId}
            onCancel={() => dispatch(setEditUserId(null))}
            onOk={onOk}
            title={user?.fullName || 'Пользователь'}
        >
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ ...user }}>
                <Spin spinning={loading}>
                    {user && (
                        <>
                            <Item name="fullName" label="Полное имя">
                                <Input />
                            </Item>
                            <Item name="active" label="Статус" valuePropName="checked">
                                <Checkbox />
                            </Item>
                            <Item name="password" label="Пароль">
                                <Password />
                            </Item>
                        </>
                    )}
                </Spin>
                {isError && <Typography.Text type="danger">{error!.message}</Typography.Text>}
            </Form>
        </Modal>
    );
};
