import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  UpdateAttributeInput,
  useAttributeQuery,
  useUpdateAttributeMutation,
} from '@/graphql';
import { Checkbox, Form, Input, Modal, Spin, Typography, message } from 'antd';
import { FC, useEffect } from 'react';
import { setEditInfo } from '../attribute.slice';

const { Text } = Typography;
const { Item, useForm } = Form;

export const UpdateAttributeModal: FC = () => {
  const dispatch = useAppDispatch();
  const { editInfo } = useAppSelector((state) => state.attribute);

  const {
    data: attributeData,
    isLoading,
    isFetching,
  } = useAttributeQuery(
    { id: editInfo.id!, type: editInfo.type! },
    { skip: !editInfo.id || !editInfo.type, refetchOnFocus: true }
  );

  const [update, { reset, isError, error, isLoading: isUpdating }] = useUpdateAttributeMutation();
  const [form] = useForm<UpdateAttributeInput>();

  useEffect(() => {
    form.resetFields();
  }, [attributeData]);

  const onOk = async () => {
    const values = await form.validateFields();

    update({ input: { ...values } }).then((res) => {
      if ('data' in res) {
        message.success('Тег обновлён!');
        reset();
        form.resetFields();
        dispatch(setEditInfo({}));
      }
    });
  };

  const loading = isLoading || isFetching || isUpdating;

  return (
    <Modal
      visible={!!editInfo.id && !!editInfo.type}
      onCancel={() => dispatch(setEditInfo({}))}
      onOk={onOk}
      destroyOnClose={true}
      title={`Обновить тег ${attributeData?.attribute?.name}`}
    >
      <Spin spinning={loading}>
        {attributeData?.attribute && (
          <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <>
              <Item name="name" label="Название" initialValue={attributeData?.attribute?.name}>
                <Input />
              </Item>
              <Item
                initialValue={attributeData?.attribute?.active}
                name="active"
                label="Активен"
                valuePropName="checked"
              >
                <Checkbox />
              </Item>
              <Item name="type" hidden initialValue={editInfo.type}>
                <Input value={editInfo.type} />
              </Item>
              <Item name="id" hidden initialValue={editInfo.id}>
                <Input value={attributeData?.attribute.id} type="number" />
              </Item>
            </>
            {isError && <Text type="danger">{error!.message}</Text>}
          </Form>
        )}
      </Spin>
    </Modal>
  );
};
