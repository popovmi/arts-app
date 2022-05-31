import { useAppDispatch } from '@/app/store';
import { artAttributesTypes } from '@/features/art/art-attribute.types';
import { ArtFileUpload, ArtUploadFileView } from '@/features/art/components';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { CreateProjectInput, useCreateProjectMutation } from '@/graphql';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Collapse, Divider, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { projectAttributesTypes } from '../project-attribute.types';
import { clearFilter } from '../project.slice';

const { Item } = Form;
const { Text } = Typography;
const { Panel } = Collapse;

export const CreateProjectForm = () => {
    const dispatch = useAppDispatch();

    const [createProject, { isLoading, error, isError, reset }] = useCreateProjectMutation({
        fixedCacheKey: 'createProject',
    });

    const [form] = Form.useForm<CreateProjectInput>();

    const onFormFinish = (createProjectInput: CreateProjectInput) => {
        createProject({ createProjectInput }).then((res) => 'data' in res && dispatch(clearFilter()));
    };

    const onUpload: OnArtFileUploadCallback = ({ filePath, fileName, index }) => {
        const fileParts = fileName.split('.');
        const name = fileParts[0];
        const arts = form.getFieldValue('arts');
        arts[index] = { ...arts[index], name, filePath };

        form.setFieldsValue({ arts });
    };

    const onArtDelete = (index: number) => {
        const arts = form.getFieldValue('arts');
        arts.splice(index, 1);
        form.setFieldsValue({ arts });
    };

    return (
        <Row gutter={[8, 8]} style={{ padding: '0 8px' }} justify="center">
            <Col xs={24}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    name="newArt"
                    form={form}
                    onFinish={onFormFinish}
                    labelAlign="left"
                >
                    <Spin spinning={isLoading}>
                        <Row gutter={[8, 8]} style={{ padding: '0 8px' }} justify="center">
                            <Divider orientation="left">
                                <Typography.Title level={2} style={{ margin: 0 }}>
                                    Данные проекта
                                </Typography.Title>
                            </Divider>
                            <Col xs={24}>
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
                            </Col>
                            <Col xs={24} md={8}>
                                <Item
                                    label="Название"
                                    name="name"
                                    rules={[{ required: true, message: 'Необходимо загрузить файл!' }]}
                                >
                                    <Input />
                                </Item>
                                <Item
                                    label="Внутренний"
                                    name="internal"
                                    valuePropName="checked"
                                    initialValue={true}
                                >
                                    <Checkbox />
                                </Item>

                                <Item
                                    label="Есть КД"
                                    name="hasDesignDoc"
                                    valuePropName="checked"
                                    initialValue={true}
                                >
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
                            </Col>
                            <Divider orientation="left">
                                <Typography.Title level={2} style={{ margin: 0 }}>
                                    ART-ы
                                </Typography.Title>
                            </Divider>
                            <Col xs={24}>
                                <Form.List name="arts">
                                    {(fields, { add, remove }, { errors }) => (
                                        <Row gutter={[8, 8]}>
                                            <Col xs={24}>
                                                <Collapse accordion>
                                                    {fields.map((field, index) => {
                                                        const { key, name, ...restField } = field;
                                                        const filePath =
                                                            form.getFieldValue(['arts', index, 'filePath']) ||
                                                            undefined;
                                                        const header =
                                                            form.getFieldValue(['arts', index, 'name']) ||
                                                            '-';
                                                        return (
                                                            <Panel
                                                                key={key}
                                                                header={
                                                                    <Space>
                                                                        {header}
                                                                        <DeleteOutlined
                                                                            style={{ color: 'red' }}
                                                                            onClick={() => onArtDelete(index)}
                                                                        />
                                                                    </Space>
                                                                }
                                                            >
                                                                <Row>
                                                                    <Col xs={24} md={8}>
                                                                        <Row gutter={[8, 8]}>
                                                                            <Col flex={1}>
                                                                                <Item
                                                                                    {...restField}
                                                                                    label="Чертеж(ревизия)"
                                                                                    name={[index, 'name']}
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message:
                                                                                                'Необходимо загрузить файл!',
                                                                                        },
                                                                                    ]}
                                                                                >
                                                                                    <Input />
                                                                                </Item>
                                                                            </Col>
                                                                            <Col flex={'none'}>
                                                                                <ArtFileUpload
                                                                                    onSuccess={({
                                                                                        filePath,
                                                                                        fileName,
                                                                                    }) =>
                                                                                        onUpload({
                                                                                            filePath,
                                                                                            fileName,
                                                                                            index,
                                                                                        })
                                                                                    }
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                        <Item
                                                                            {...restField}
                                                                            label="Внутренний"
                                                                            name={[index, 'internal']}
                                                                            valuePropName="checked"
                                                                            initialValue={true}
                                                                        >
                                                                            <Checkbox />
                                                                        </Item>
                                                                        {artAttributesTypes.map((type) => (
                                                                            <Item
                                                                                key={type}
                                                                                label={AttributesLabels[type]}
                                                                                name={[index, type]}
                                                                            >
                                                                                <AttributeSelector
                                                                                    active
                                                                                    type={type}
                                                                                    allowClear
                                                                                />
                                                                            </Item>
                                                                        ))}

                                                                        <Item
                                                                            name={[index, 'filePath']}
                                                                            style={{ height: 0 }}
                                                                        >
                                                                            <Input
                                                                                readOnly
                                                                                style={{ display: 'none' }}
                                                                            />
                                                                        </Item>
                                                                    </Col>
                                                                    {filePath && (
                                                                        <Col xs={24} md={16}>
                                                                            <ArtUploadFileView
                                                                                filePath={filePath}
                                                                            />
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </Panel>
                                                        );
                                                    })}
                                                </Collapse>
                                            </Col>
                                            <Col xs={24}>
                                                <Button onClick={() => add()}>Добавить</Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Form.List>
                            </Col>
                            <Item>
                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </Item>
                        </Row>
                    </Spin>
                </Form>
            </Col>
        </Row>
    );
};
