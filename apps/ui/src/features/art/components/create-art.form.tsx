import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { ProjectsSelector } from '@/features/project/components';
import { CreateArtInput, useCreateArtMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { useState } from 'react';
import { clearFilter } from '..';
import { artAttributesTypes } from '../art-attribute.types';
import { ArtFileUpload, ArtUploadFileView } from '../components';

const { Item } = Form;
const { Text } = Typography;

export const CreateArtForm = () => {
    const dispatch = useAppDispatch();
    const [createArt, { isLoading, error, isError, reset }] = useCreateArtMutation({ fixedCacheKey: 'createArt' });
    const [form] = Form.useForm<CreateArtInput>();
    const [fileInfo, setFileInfo] = useState({ filePath: '', fileExtension: '' });
    const onUpload = ({ filePath, fileName }: { filePath: string; fileName: string }) => {
        const fileParts = fileName.split('.');
        const fileExtension = fileParts.pop()?.toLowerCase() || '';
        const name = fileParts.join('.');

        form.setFieldsValue({ name, filePath });
        setFileInfo({ filePath, fileExtension });
    };

    const onFormFinish = (createArtInput: CreateArtInput) => {
        createArt({ createArtInput }).then((res) => 'data' in res && dispatch(clearFilter()));
    };

    return (
        <Row gutter={[8, 8]} justify="center">
            <Col xs={24}>
                {isError && (
                    <Space>
                        <Text type="danger">{error?.message}</Text>
                        <Button size="small" type="link" danger icon={<CloseOutlined />} onClick={reset} />
                    </Space>
                )}
            </Col>
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
                        <Row gutter={8}>
                            <Col flex={1}>
                                <Item
                                    label="Название"
                                    name="name"
                                    rules={[{ required: true, message: 'Необходимо загрузить файл!' }]}
                                >
                                    <Input readOnly />
                                </Item>
                            </Col>
                            <Col flex={'none'}>
                                <ArtFileUpload onSuccess={onUpload} />
                            </Col>
                        </Row>
                        <Item label="Внутренний" name="internal" valuePropName="checked" initialValue={true}>
                            <Checkbox />
                        </Item>
                        <Item label="Проект" name="projectId">
                            <ProjectsSelector allowClear />
                        </Item>
                        {artAttributesTypes.map((type) => (
                            <Item key={type} label={AttributesLabels[type]} name={type}>
                                <AttributeSelector active type={type} allowClear />
                            </Item>
                        ))}
                        <Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Item>
                        <Item name="filePath" style={{ height: 0 }}>
                            <Input readOnly style={{ display: 'none' }} />
                        </Item>
                    </Spin>
                </Form>
            </Col>
            <Col xs={24} md={16}>
                {fileInfo.filePath && (
                    <ArtUploadFileView filePath={fileInfo.filePath} extension={fileInfo.fileExtension} />
                )}
            </Col>
        </Row>
    );
};
