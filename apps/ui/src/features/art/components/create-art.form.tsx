import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { ProjectsSelector } from '@/features/project/components';
import { CreateArtInput, useCreateManyArtsMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Collapse, Button, Checkbox, Col, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { Fragment, useState } from 'react';
import { clearFilter } from '..';
import { artAttributesTypes } from '../art-attribute.types';
import { ArtFileUpload, ArtUploadFileView } from '../components';

const { Item } = Form;
const { Text } = Typography;
const { Panel } = Collapse;

export const CreateArtForm = () => {
    const dispatch = useAppDispatch();
    const [createArts, { isLoading, error, isError, reset }] = useCreateManyArtsMutation({
        fixedCacheKey: 'createArts',
    });
    const [form] = Form.useForm<{ arts: CreateArtInput[] }>();
    const [fileInfo, setFileInfo] = useState([{ artIndex: 0, filePath: '', fileExtension: '' }]);
    const onUpload = ({
        filePath,
        fileName,
        artIndex,
    }: {
        filePath: string;
        fileName: string;
        artIndex: number;
    }) => {
        const fileParts = fileName.split('.');
        const fileExtension = fileParts.pop()?.toLowerCase() || '';
        const name = fileParts.join('.');
        const arts = form.getFieldValue('arts');
        let _fileInfo = Array.from(fileInfo);
        const fileIndex = _fileInfo.findIndex((_file) => _file.artIndex === artIndex);
        arts[artIndex] = { ...arts[artIndex], name, filePath };

        if (fileIndex > -1) {
            _fileInfo[fileIndex] = { ..._fileInfo[fileIndex], filePath, fileExtension };
        } else {
            _fileInfo = [..._fileInfo, { artIndex, filePath, fileExtension }];
        }

        form.setFieldsValue({ arts });
        setFileInfo(_fileInfo);
    };

    const onFormFinish = ({ arts }: { arts: CreateArtInput[] }) => {
        createArts({ artsInput: arts }).then((res) => 'data' in res && dispatch(clearFilter()));
    };

    return (
        <Row gutter={[8, 8]} justify="center" style={{ padding: 16 }}>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="newArts"
                form={form}
                onFinish={onFormFinish}
                labelAlign="left"
                style={{ width: '100%' }}
            >
                <Spin spinning={isLoading}>
                    <Form.List name="arts">
                        {(fields, { add, remove }, { errors }) => (
                            <Row gutter={[8, 8]}>
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
                                <Col xs={24}>
                                    <Collapse accordion>
                                        {fields.map(({ key, name, ...restField }, artIndex) => {
                                            const _fileInfo = fileInfo.find(
                                                (_fileInfo) => _fileInfo.artIndex === artIndex
                                            );
                                            const header =
                                                form.getFieldValue(['arts', artIndex, 'name']) || '-';
                                            return (
                                                <Panel key={key} header={header}>
                                                    <Row>
                                                        <Col xs={24} md={8}>
                                                            <Row gutter={[8, 8]}>
                                                                <Col flex={1}>
                                                                    <Item
                                                                        {...restField}
                                                                        label="Чертеж(ревизия)"
                                                                        name={[artIndex, 'name']}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'Необходимо загрузить файл!',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input readOnly />
                                                                    </Item>
                                                                </Col>
                                                                <Col flex={'none'}>
                                                                    <ArtFileUpload
                                                                        onSuccess={({ filePath, fileName }) =>
                                                                            onUpload({
                                                                                filePath,
                                                                                fileName,
                                                                                artIndex,
                                                                            })
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Item
                                                                {...restField}
                                                                label="Внутренний"
                                                                name={[artIndex, 'internal']}
                                                                valuePropName="checked"
                                                                initialValue={true}
                                                            >
                                                                <Checkbox />
                                                            </Item>
                                                            <Item
                                                                label="Проект"
                                                                name={[artIndex, 'projectId']}
                                                            >
                                                                <ProjectsSelector allowClear />
                                                            </Item>
                                                            {artAttributesTypes.map((type) => (
                                                                <Item
                                                                    key={type}
                                                                    label={AttributesLabels[type]}
                                                                    name={[artIndex, type]}
                                                                >
                                                                    <AttributeSelector
                                                                        active
                                                                        type={type}
                                                                        allowClear
                                                                    />
                                                                </Item>
                                                            ))}

                                                            <Item
                                                                name={[artIndex, 'filePath']}
                                                                style={{ height: 0 }}
                                                            >
                                                                <Input readOnly style={{ display: 'none' }} />
                                                            </Item>
                                                        </Col>
                                                        <Col xs={24} md={16}>
                                                            {_fileInfo?.filePath && (
                                                                <ArtUploadFileView
                                                                    filePath={_fileInfo.filePath}
                                                                    extension={_fileInfo.fileExtension}
                                                                />
                                                            )}
                                                        </Col>
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
                    <Item style={{ marginTop: 8 }}>
                        <Button type={'primary'} htmlType="submit">
                            Сохранить
                        </Button>
                    </Item>
                </Spin>
            </Form>
        </Row>
    );
};
