import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { CreateProjectInput, useCreateProjectMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { projectAttributesTypes } from '../project-attribute.types';
import { clearFilter } from '../project.slice';

const { Item } = Form;
const { Text } = Typography;

export const CreateProjectForm = () => {
    const dispatch = useAppDispatch();
    const [createProject, { isLoading, error, isError, reset }] = useCreateProjectMutation({
        fixedCacheKey: 'createProject',
    });
    const [form] = Form.useForm<CreateProjectInput>();
    const onFormFinish = (createProjectInput: CreateProjectInput) => {
        createProject({ createProjectInput }).then((res) => 'data' in res && dispatch(clearFilter()));
    };

    return (
        <Row gutter={[8, 8]} justify="center">
            <Col xs={24} md={8}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    name="newArt"
                    form={form}
                    onFinish={onFormFinish}
                    labelAlign="left"
                >
                    <Spin spinning={isLoading}>
                        <Item
                            label="Название"
                            name="name"
                            rules={[{ required: true, message: 'Необходимо загрузить файл!' }]}
                        >
                            <Input />
                        </Item>
                        <Item label="Внутренний" name="internal" valuePropName="checked" initialValue={true}>
                            <Checkbox />
                        </Item>

                        <Item label="Есть КД" name="hasDesignDoc" valuePropName="checked" initialValue={true}>
                            <Checkbox />
                        </Item>
                        {projectAttributesTypes.map((type) => (
                            <Item key={type} label={AttributesLabels[type]} name={type}>
                                <AttributeSelector active type={type} allowClear />
                            </Item>
                        ))}
                        <Item label="Заказчик" name="customerId">
                            <CustomerSelector active />
                        </Item>
                        <Item label="Завод" name="factoryId">
                            <FactorySelector active />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Item>
                    </Spin>
                    {isError && (
                        <Space>
                            <Text type="danger">{error?.message}</Text>
                            <Button
                                size="small"
                                type="link"
                                danger
                                icon={<CloseOutlined />}
                                onClick={reset}
                            />
                        </Space>
                    )}
                </Form>
            </Col>
        </Row>
    );
};
