import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { ProjectsSelector } from '@/features/project/components';
import { CreateArtInput, useCreateManyArtsMutation } from '@/graphql';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Collapse, Form, Input, Row, Space, Spin, Typography } from 'antd';
import { clearFilter } from '..';
import { artAttributesTypes } from '../art-attribute.types';
import { ArtFileUpload, ArtUploadFileView } from '../components';

const { Item } = Form;
const { Text } = Typography;
const { Panel } = Collapse;

type OnArtFileUploadCallback = (params: { filePath: string; fileName: string; index: number }) => void;

export const CreateArtForm = () => {
    const dispatch = useAppDispatch();
    const [createArts, { isLoading, error, isError, reset }] = useCreateManyArtsMutation({
        fixedCacheKey: 'createArts',
    });
    const [form] = Form.useForm<{ arts: CreateArtInput[] }>();

    const onUpload: OnArtFileUploadCallback = ({ filePath, fileName, index }) => {
        const fileParts = fileName.split('.');
        const name = fileParts[0];
        const arts = form.getFieldValue('arts');
        arts[index] = { ...arts[index], name, filePath };

        form.setFieldsValue({ arts });
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
                                        {fields.map((field, index) => {
                                            const { key, name, ...restField } = field;
                                            const filePath =
                                                form.getFieldValue(['arts', index, 'filePath']) || undefined;
                                            const header = form.getFieldValue(['arts', index, 'name']) || '-';
                                            return (
                                                <Panel key={key} header={header}>
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
                                                                        onSuccess={({ filePath, fileName }) =>
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
                                                            <Item label="Проект" name={[index, 'projectId']}>
                                                                <ProjectsSelector allowClear />
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
                                                                <Input readOnly style={{ display: 'none' }} />
                                                            </Item>
                                                        </Col>
                                                        {filePath && (
                                                            <Col xs={24} md={16}>
                                                                <ArtUploadFileView filePath={filePath} />
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
