import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { ProjectsSelector } from '@/features/project/components';
import { Art, UpdateArtInput, useUpdateArtMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Descriptions, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtFileUpload, ArtUploadFileView } from '.';
import { clearFilter } from '..';
import { artAttributesTypes } from '../art-attribute.types';

const { Item: DItem } = Descriptions;
const { Item: FItem, useForm } = Form;
const { Text } = Typography;

interface ArtDescriptionsProps {
    art: Art;
}

export const ArtDescriptions: FC<ArtDescriptionsProps> = ({ art }) => {
    const dispatch = useAppDispatch();
    const [edit, toggleEdit] = useToggle();
    const [form] = useForm<UpdateArtInput>();
    const [update, { data, isLoading, isSuccess, reset }] = useUpdateArtMutation({ fixedCacheKey: 'updateArt' });
    const [fileInfo, setFileInfo] = useState({ filePath: '', fileExtension: '' });
    const onUpload = ({ filePath, fileName }: { filePath: string; fileName: string }) => {
        const fileParts = fileName.split('.');
        const fileExtension = fileParts.pop()?.toLowerCase() || '';
        const name = fileParts.join('.');

        form.setFieldsValue({ name, filePath });
        setFileInfo({ filePath, fileExtension });
    };

    useEffect(() => {
        return () => form.resetFields();
    }, []);

    const onFinish = async () => {
        const values = await form.validateFields();

        Object.assign(values, { id: art.id });
        console.log(values);
        update({ updateArtInput: values }).then((res) => 'data' in res && dispatch(clearFilter()));
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
            toggleEdit();
            form.resetFields();
        }
    }, [isSuccess]);

    return (
        <Form initialValues={{ ...art }} form={form} component={false}>
            <Spin spinning={isLoading}>
                <Descriptions
                    bordered
                    size="small"
                    column={{ xs: 1, sm: 1, md: 1, lg: 3 }}
                    extra={
                        <Space>
                            <Button
                                type={edit ? 'default' : 'primary'}
                                icon={<EditOutlined />}
                                onClick={() => toggleEdit()}
                            />
                            {edit && <Button type={'primary'} icon={<SaveOutlined />} onClick={onFinish} />}
                        </Space>
                    }
                >
                    <DItem label={'Внутренний'}>
                        {edit ? (
                            <FItem name="internal" valuePropName="checked">
                                <Checkbox />
                            </FItem>
                        ) : (
                            <Text>{art.internal ? 'Да' : 'Нет'}</Text>
                        )}
                    </DItem>
                    {artAttributesTypes.map((type) => (
                        <DItem key={type} label={AttributesLabels[type]}>
                            {edit ? (
                                <FItem name={type}>
                                    <AttributeSelector
                                        active
                                        type={type}
                                        allowClear
                                        onClear={() => form.setFieldsValue({ [type]: undefined })}
                                    />
                                </FItem>
                            ) : (
                                <Text>{art[type as keyof Art]}</Text>
                            )}
                        </DItem>
                    ))}

                    <DItem label={'Проект'}>
                        {edit ? (
                            <FItem name="projectId">
                                <ProjectsSelector
                                    allowClear
                                    currentProject={art?.project && art.project}
                                    onClear={() => form.setFieldsValue({ projectId: undefined })}
                                />
                            </FItem>
                        ) : (
                            art?.project && <Link to={`/projects/${art.project?.id}`}>{art.project?.name}</Link>
                        )}
                    </DItem>

                    {edit && (
                        <DItem label={'Файл'}>
                            <FItem name="filePath" style={{ height: 0, width: 0 }}>
                                <Input readOnly style={{ display: 'none' }} />
                            </FItem>
                            <Row gutter={8}>
                                <Col flex={'none'}>
                                    <Space direction="vertical">
                                        {' '}
                                        <ArtFileUpload onSuccess={onUpload} />
                                    </Space>
                                </Col>
                                <Col flex={1}>
                                    {fileInfo.filePath && (
                                        <ArtUploadFileView
                                            height={300}
                                            width={250}
                                            filePath={fileInfo.filePath}
                                            extension={fileInfo.fileExtension}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </DItem>
                    )}
                </Descriptions>
            </Spin>
        </Form>
    );
};
