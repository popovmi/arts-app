import { useAppDispatch, useAppSelector } from '@/app/store';
import { UpdateCustomerInput, useCustomerQuery, useUpdateCustomerMutation } from '@/graphql';
import { Checkbox, Form, Input, Modal, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { setEditCustomerId } from '../customer.slice';

const { Item, useForm } = Form;

export const UpdateCustomerModal: FC = () => {
    const dispatch = useAppDispatch();
    const { editCustomerId } = useAppSelector((state) => state.customer);
    const {
        data: customerData,
        isLoading,
        isFetching,
    } = useCustomerQuery({ id: editCustomerId! }, { skip: !editCustomerId });
    const customer = customerData?.customer;
    const [update, { reset, isError, error, isLoading: isUpdating }] = useUpdateCustomerMutation();
    const [form] = useForm<UpdateCustomerInput>();

    useEffect(() => {
        form.resetFields();
    }, [customer]);

    const onOk = async () => {
        const values = await form.validateFields();

        update({ input: { ...values, id: customer!.id } }).then((res) => {
            if ('data' in res) {
                form.resetFields();
                reset();
                dispatch(setEditCustomerId(null));
            }
        });
    };

    const loading = isLoading || isFetching || isUpdating;

    return (
        <Modal
            visible={!!editCustomerId}
            onCancel={() => dispatch(setEditCustomerId(null))}
            onOk={onOk}
            title={customer?.name || 'Заказчик'}
        >
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ ...customer }}
            >
                <Spin spinning={loading}>
                    {customer && (
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
