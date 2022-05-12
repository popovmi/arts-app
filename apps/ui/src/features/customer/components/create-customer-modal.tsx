import { useAppDispatch, useAppSelector } from '@/app/store';
import { CreateCustomerInput, useCreateCustomerMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Checkbox, Button, Form, Input, Modal, Space, Spin, Typography } from 'antd';
import { FC } from 'react';
import { selectCustomers, setShowCreateCustomer } from '../customer.slice';

const { Item } = Form;
const { Text } = Typography;

export const CreateCustomerModal: FC = () => {
    const dispatch = useAppDispatch();
    const { showCreateCustomer } = useAppSelector(selectCustomers);
    const [createCustomer, { isLoading, error, isError, reset }] = useCreateCustomerMutation({
        fixedCacheKey: 'createCustomer',
    });
    const [form] = Form.useForm<CreateCustomerInput>();
    const onFormFinish = async () => {
        const input = await form.validateFields();

        createCustomer({ input }).then((res) => {
            if ('data' in res) {
                form.resetFields();
                dispatch(setShowCreateCustomer(false));
            }
        });
    };

    return (
        <Modal
            title="Новый заказчик"
            visible={showCreateCustomer}
            onOk={onFormFinish}
            onCancel={() => dispatch(setShowCreateCustomer(false))}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="newCustomer"
                form={form}
                labelAlign="left"
            >
                <Spin spinning={isLoading}>
                    <Item label="Название" name="name" rules={[{ required: true, message: 'Обязательно!' }]}>
                        <Input />
                    </Item>
                    <Item label="Активен" name="active" valuePropName="checked">
                        <Checkbox />
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
