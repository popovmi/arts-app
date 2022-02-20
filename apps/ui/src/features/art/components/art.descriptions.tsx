import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { ProjectsSelector } from '@/features/project/components';
import { Art, UpdateArtInput, useUpdateArtMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Descriptions, Form, Space, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { artAttributesTypes } from '../art-attribute.types';

const { Item: DItem } = Descriptions;
const { Item: FItem, useForm } = Form;
const { Text } = Typography;

interface ArtDescriptionsProps {
    art: Art;
}

export const ArtDescriptions: FC<ArtDescriptionsProps> = ({ art }) => {
    const [edit, toggleEdit] = useToggle();
    const [form] = useForm<UpdateArtInput>();
    const [update, { data, isLoading, isSuccess, reset }] = useUpdateArtMutation({ fixedCacheKey: 'updateArt' });

    useEffect(() => {
        return () => form.resetFields();
    }, []);

    const onFinish = async () => {
        const values = await form.validateFields();

        update({ updateArtInput: { ...values, id: art.id } });
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
                                    <AttributeSelector active type={type} allowClear />
                                </FItem>
                            ) : (
                                <Text>{art[type as keyof Art]}</Text>
                            )}
                        </DItem>
                    ))}

                    <DItem label={'Проект'}>
                        {edit ? (
                            <FItem name="projectId">
                                <ProjectsSelector allowClear currentProject={art?.project && art.project} />
                            </FItem>
                        ) : (
                            art?.project && <Link to={`/projects/${art.project?.name}`}>{art.project?.name}</Link>
                        )}
                    </DItem>
                </Descriptions>
            </Spin>
        </Form>
    );
};
