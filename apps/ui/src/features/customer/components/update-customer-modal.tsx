// import { Checkbox, Form, Input, message, Modal } from 'antd';
// import { FC, useEffect } from 'react';

// import { useAppDispatch, useAppSelector } from '~/app/store';

// import { resetState, setEdit, update } from '../customer.slice';
// import { UpdateCustomerDto } from '../interfaces';

// export const UpdateCustomerModal: FC = () => {
//   const { editUuid, updateSuccess, updateError, data } = useAppSelector(state => state.customers);
//   const [form] = Form.useForm<UpdateCustomerDto>();
//   const dispatch = useAppDispatch();
//   const company = data?.find(company => company.uuid === editUuid);

//   useEffect(() => {
//     form.resetFields();
//   }, [editUuid]);

//   useEffect(() => {
//     if (updateSuccess) {
//       message.success(`Заказчик успешно обновлён`);
//       form.resetFields();
//       dispatch(setEdit(undefined));
//     }

//     return () => {
//       dispatch(resetState());
//     };
//   }, [updateSuccess]);

//   useEffect(() => {
//     if (updateError) {
//       message.error(`Не удалось обновить заказчика. ${updateError}`);
//     }
//   }, [updateError]);

//   const handleUpdate = async () => {
//     const data = await form.validateFields();
//     dispatch(update({ uuid: editUuid, data }));
//   };

//   return (
//     <Modal
//       visible={!!editUuid}
//       title={`Редактировать заказчика ${company?.name}`}
//       okText='Сохранить'
//       cancelText='Отменить'
//       onCancel={() => dispatch(setEdit(undefined))}
//       onOk={handleUpdate}
//       forceRender={true}>
//       <Form
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         name='newCustomer'
//         form={form}
//         initialValues={company}
//         labelAlign='left'>
//         <Form.Item
//           label='Название'
//           name='name'
//           rules={[{ required: true, message: 'Обязательно!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label='Активен' name='active' valuePropName='checked'>
//           <Checkbox />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };
