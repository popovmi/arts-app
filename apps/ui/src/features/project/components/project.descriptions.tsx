import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { Customer, Factory, Project, UpdateProjectInput, useUpdateProjectMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Descriptions, Form, Row, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { projectAttributesTypes } from '../project-attribute.types';
import { clearFilter } from '../project.slice';

const { Item: DItem } = Descriptions;
const { Item: FItem, useForm } = Form;
const { Text } = Typography;

interface ProjectDescriptionsProps {
    project: Project;
}

export const ProjectDescriptions: FC<ProjectDescriptionsProps> = ({ project }) => {
    const dispatch = useAppDispatch();
    const [isEdit, toggleEdit] = useToggle();
    const [form] = useForm<UpdateProjectInput>();
    const [update, { isLoading, isSuccess, reset }] = useUpdateProjectMutation({
        fixedCacheKey: 'updateProject',
    });

    useEffect(() => {
        if (isEdit) form.resetFields();
    }, [isEdit]);

    const onFinish = async () => {
        if (form.isFieldsTouched()) {
            const updateProjectInput = await form.validateFields();

            Object.assign(updateProjectInput, { id: project.id });
            update({ updateProjectInput }).then((res) => {
                if ('data' in res) dispatch(clearFilter());
            });
        } else {
            toggleEdit();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
            form.resetFields();
            toggleEdit(false);
        }
        return () => form.resetFields();
    }, [isSuccess]);

    return (
        <Form
            initialValues={{
                ...project,
                customerId: project?.customer?.id,
                factoryId: project?.factory?.id,
            }}
            form={form}
            component={false}
        >
            <Spin spinning={isLoading}>
                <Row justify="end" gutter={[8, 8]} style={{ padding: 8 }}>
                    {isEdit ? (
                        <Button type={'primary'} icon={<SaveOutlined />} onClick={onFinish} />
                    ) : (
                        <Button icon={<EditOutlined />} onClick={() => toggleEdit(true)} />
                    )}
                </Row>
                <Descriptions bordered size="small" column={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                    <DItem label={'Внутренний'}>
                        {isEdit ? (
                            <FItem noStyle name="internal" valuePropName="checked">
                                <Checkbox />
                            </FItem>
                        ) : (
                            <Text>{project.internal ? 'Да' : 'Нет'}</Text>
                        )}
                    </DItem>
                    <DItem label={'Есть КД'}>
                        {isEdit ? (
                            <FItem noStyle name="hasDesignDoc" valuePropName="checked">
                                <Checkbox />
                            </FItem>
                        ) : (
                            <Text>{project.hasDesignDoc ? 'Да' : 'Нет'}</Text>
                        )}
                    </DItem>
                    {projectAttributesTypes.map((type, i, arr) => (
                        <DItem key={type} label={AttributesLabels[type]}>
                            {isEdit ? (
                                <FItem noStyle name={type}>
                                    <AttributeSelector active type={type} allowClear />
                                </FItem>
                            ) : (
                                <Text>{project[type as keyof Project]}</Text>
                            )}
                        </DItem>
                    ))}

                    <DItem label={'Заказчик'}>
                        {isEdit ? (
                            <FItem noStyle name="customerId">
                                <CustomerSelector allowClear current={project?.customer as Customer} />
                            </FItem>
                        ) : (
                            <Text>{project?.customer?.name}</Text>
                        )}
                    </DItem>
                    <DItem label={'Завод'}>
                        {isEdit ? (
                            <FItem noStyle name="factoryId">
                                <FactorySelector allowClear current={project?.factory as Factory} />
                            </FItem>
                        ) : (
                            <Text>{project?.factory?.name}</Text>
                        )}
                    </DItem>
                </Descriptions>
            </Spin>
        </Form>
    );
};
