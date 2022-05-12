import { useAppDispatch, useAppSelector } from '@/app/store';
import { CreateFactoryInput, useCreateFactoryMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Space, Spin, Typography } from 'antd';
import { FC } from 'react';
import { selectFactorys, setShowCreateFactory } from '../factory.slice';

const { Item } = Form;
const { Text } = Typography;

export const CreateFactoryModal: FC = () => {
    const dispatch = useAppDispatch();
    const { showCreateFactory } = useAppSelector(selectFactorys);
    const [createFactory, { isLoading, error, isError, reset }] = useCreateFactoryMutation({
        fixedCacheKey: 'createFactory',
    });
    const [form] = Form.useForm<CreateFactoryInput>();
    const onFormFinish = async () => {
        const input = await form.validateFields();

        createFactory({ input }).then((res) => {
            if ('data' in res) {
                form.resetFields();
                dispatch(setShowCreateFactory(false));
            }
        });
    };

    return (
        <Modal
            title="Новый завод"
            visible={showCreateFactory}
            onOk={onFormFinish}
            onCancel={() => dispatch(setShowCreateFactory(false))}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="newFactory"
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
