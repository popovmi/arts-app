/* import { Checkbox, Form, Input, message, Modal } from 'antd';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/store';

import { resetState, toggleShowCreate, create } from '../customer.slice';
import { CreateCustomerDto } from '../interfaces';

export const CreateCustomerModal: FC = () => {
  const { showCreateNew, createSuccess, createError } = useAppSelector(state => state.customers);
  const [form] = Form.useForm<CreateCustomerDto>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (createSuccess) {
      message.success(`Заказчик успешно создан`);
      form.resetFields();
      dispatch(toggleShowCreate(false));
    }

    return () => {
      dispatch(resetState());
    };
  }, [createSuccess]);

  useEffect(() => {
    if (createError) {
      message.error(`Не удалось создать заказчика. ${createError}`);
    }
  }, [createError]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    dispatch(create(values));
  };

  return (
    <Modal
      visible={showCreateNew}
      title={`Новый заказчик`}
      okText='Сохранить'
      cancelText='Отменить'
      onCancel={() => dispatch(toggleShowCreate(false))}
      onOk={handleCreate}
      forceRender={true}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name='newFactory'
        form={form}
        labelAlign='left'>
        <Form.Item
          label='Название'
          name='name'
          rules={[{ required: true, message: 'Обязательно!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Активен' name='active' valuePropName='checked' initialValue={true}>
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};
 */
