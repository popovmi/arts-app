import { AttributeType, useCreateAttributeMutation } from '@/graphql';
import { SaveOutlined } from '@ant-design/icons';
import { message, Button, Form, Input } from 'antd';
import { FC, useRef } from 'react';

const { Item } = Form;

interface CreateAttributeFormProps {
    type: AttributeType;
    onSuccess: () => void;
}

export const CreateAttributeForm: FC<CreateAttributeFormProps> = ({ type, onSuccess }) => {
    const [create, { isLoading: isCreating, reset }] = useCreateAttributeMutation();

    const [form] = Form.useForm<{ name: string }>();
    const valueInput = useRef(null);

    const onFormFinish = ({ name }: { name: string }) => {
        create({ input: { name, type, active: true } }).then((result) => {
            if ('data' in result) {
                onSuccess();
                message.success('Тег создан!');
                reset();
                form.resetFields();
                (valueInput.current! as HTMLInputElement).focus();
            }
        });
    };

    return (
        <Form
            form={form}
            layout="inline"
            wrapperCol={{ span: 24 }}
            name={`${type}NewVal`}
            onFinish={onFormFinish}
        >
            <Item name="name" rules={[{ required: true, message: 'Обязательно!' }]}>
                <Input placeholder="Новое значение" ref={valueInput!} />
            </Item>
            <Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isCreating} />
            </Item>
        </Form>
    );
};
