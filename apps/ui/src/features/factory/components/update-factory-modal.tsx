import { useAppDispatch, useAppSelector } from '@/app/store';
import { UpdateFactoryInput, useFactoryQuery, useUpdateFactoryMutation } from '@/graphql';
import { Checkbox, Form, Input, Modal, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { setEditFactoryId } from '../factory.slice';

const { Item, useForm } = Form;

export const UpdateFactoryModal: FC = () => {
    const dispatch = useAppDispatch();
    const { editFactoryId } = useAppSelector((state) => state.factory);
    const {
        data: factoryData,
        isLoading,
        isFetching,
    } = useFactoryQuery({ id: editFactoryId! }, { skip: !editFactoryId });
    const factory = factoryData?.factory;
    const [update, { reset, isError, error, isLoading: isUpdating }] = useUpdateFactoryMutation();
    const [form] = useForm<UpdateFactoryInput>();

    useEffect(() => {
        form.resetFields();
    }, [factory]);

    const onOk = async () => {
        const values = await form.validateFields();

        update({ input: { ...values, id: factory!.id } }).then((res) => {
            if ('data' in res) {
                form.resetFields();
                reset();
                dispatch(setEditFactoryId(null));
            }
        });
    };

    const loading = isLoading || isFetching || isUpdating;

    return (
        <Modal
            visible={!!editFactoryId}
            onCancel={() => dispatch(setEditFactoryId(null))}
            onOk={onOk}
            title={factory?.name || 'Завод'}
        >
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ ...factory }}>
                <Spin spinning={loading}>
                    {factory && (
                        <>
                            <Item name="name" label="Название">
                                <Input />
                            </Item>
                            <Item name="active" label="Активен" valuePropName="checked">
                                <Checkbox />
                            </Item>
                        </>
                    )}
                </Spin>
                {isError && <Typography.Text type="danger">{error!.message}</Typography.Text>}
            </Form>
        </Modal>
    );
};
