import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { ProjectsSelector } from '@/features/project/components';
import { Art, UpdateArtInput, useUpdateArtMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Descriptions, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtFileUpload, ArtUploadFileView } from '.';
import { artAttributesTypes } from '../art-attribute.types';
import { clearFilter } from '../art.slice';

const { Item: DItem } = Descriptions;
const { Item: FItem, useForm } = Form;
const { Text } = Typography;

interface ArtDescriptionsProps {
    art: Art;
    editable?: boolean;
}

export const ArtDescriptions: FC<ArtDescriptionsProps> = ({ art, editable = true }) => {
    const dispatch = useAppDispatch();
    const [isEdit, toggleEdit] = useToggle();
    const [form] = useForm<UpdateArtInput>();
    const [update, { isLoading, isSuccess, reset }] = useUpdateArtMutation({
        fixedCacheKey: 'updateArt',
    });
    const [fileInfo, setFileInfo] = useState({ filePath: '', fileExtension: '' });

    useEffect(() => {
        if (isEdit) form.resetFields();
    }, [isEdit]);

    useEffect(() => {
        if (isSuccess) {
            reset();
            toggleEdit(false);
            form.resetFields();
        }
    }, [isSuccess]);

    useEffect(() => {
        return () => form.resetFields();
    }, []);

    const onUpload = ({ filePath, fileName }: { filePath: string; fileName: string }) => {
        const fileParts = fileName.split('.');
        const fileExtension = fileParts.pop()?.toLowerCase() || '';

        form.setFieldsValue({ filePath });
        setFileInfo({ filePath, fileExtension });
    };

    const onFinish = async () => {
        if (form.isFieldsTouched()) {
            const updateArtInput = await form.validateFields();

            Object.assign(updateArtInput, { id: art.id });
            update({ updateArtInput: updateArtInput }).then(
                (res) => 'data' in res && dispatch(clearFilter())
            );
        } else {
            toggleEdit(false);
        }
    };

    const cancelFile = () => {
        form.setFieldsValue({ filePath: undefined });
        setFileInfo({ filePath: '', fileExtension: '' });
    };

    return (
        <Form initialValues={{ ...art }} form={form} component={false} layout="horizontal">
            <Spin spinning={isLoading}>
                {editable && (
                    <Row justify="end" gutter={[8, 8]} style={{ padding: 8 }}>
                        {isEdit ? (
                            <Button type={'primary'} icon={<SaveOutlined />} onClick={onFinish} />
                        ) : (
                            <Button icon={<EditOutlined />} onClick={() => toggleEdit(true)} />
                        )}
                    </Row>
                )}
                <Descriptions bordered size="small" column={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                    <DItem label={'Внутренний'}>
                        {isEdit ? (
                            <FItem noStyle name="internal" valuePropName="checked">
                                <Checkbox />
                            </FItem>
                        ) : (
                            <Text>{art.internal ? 'Да' : 'Нет'}</Text>
                        )}
                    </DItem>
                    {artAttributesTypes.map((type) => (
                        <DItem key={type} label={AttributesLabels[type]}>
                            {isEdit ? (
                                <FItem noStyle name={type}>
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

                    <DItem label={'Проект'} span={3}>
                        {isEdit ? (
                            <FItem noStyle name="projectId">
                                <ProjectsSelector
                                    allowClear
                                    currentProject={art?.project && art.project}
                                    onClear={() => form.setFieldsValue({ projectId: undefined })}
                                />
                            </FItem>
                        ) : (
                            art?.project && (
                                <Link to={`/projects/${art.project?.id}`}>{art.project?.name}</Link>
                            )
                        )}
                    </DItem>

                    {isEdit && (
                        <DItem label={'Файл'}>
                            <FItem noStyle name="filePath" style={{ height: 0, width: 0 }}>
                                <Input readOnly style={{ display: 'none' }} />
                            </FItem>
                            <Row gutter={8}>
                                <Col flex={'none'}>
                                    <Space direction="vertical">
                                        <ArtFileUpload onSuccess={onUpload} />
                                        {fileInfo.filePath && (
                                            <Button icon={<CloseOutlined />} onClick={cancelFile} />
                                        )}
                                    </Space>
                                </Col>
                                <Col flex={1}>
                                    {fileInfo.filePath && (
                                        <ArtUploadFileView
                                            height={300}
                                            width={250}
                                            filePath={fileInfo.filePath}
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
