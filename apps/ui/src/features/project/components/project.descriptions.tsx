import { useAppDispatch } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { Customer, Factory, Project, UpdateProjectInput, useUpdateProjectMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Descriptions, Form, Space, Spin, Typography } from 'antd';
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
  const [edit, toggleEdit] = useToggle();
  const [form] = useForm<UpdateProjectInput>();
  const [update, { isLoading, isSuccess, reset }] = useUpdateProjectMutation({
    fixedCacheKey: 'updateProject',
  });

  useEffect(() => {
    return () => form.resetFields();
  }, []);

  const onFinish = async () => {
    const values = await form.validateFields();

    update({ updateProjectInput: { ...values, id: project.id } }).then(
      (res) => 'data' in res && dispatch(clearFilter())
    );
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      toggleEdit();
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Form
      initialValues={{ ...project, customerId: project?.customer?.id, factoryId: project?.factory?.id }}
      form={form}
      component={false}
    >
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
              <FItem noStyle name="internal" valuePropName="checked">
                <Checkbox />
              </FItem>
            ) : (
              <Text>{project.internal ? 'Да' : 'Нет'}</Text>
            )}
          </DItem>
          <DItem label={'Есть КД'}>
            {edit ? (
              <FItem noStyle name="hasDesignDoc" valuePropName="checked">
                <Checkbox />
              </FItem>
            ) : (
              <Text>{project.hasDesignDoc ? 'Да' : 'Нет'}</Text>
            )}
          </DItem>
          {projectAttributesTypes.map((type) => (
            <DItem key={type} label={AttributesLabels[type]}>
              {edit ? (
                <FItem noStyle name={type}>
                  <AttributeSelector active type={type} allowClear />
                </FItem>
              ) : (
                <Text>{project[type as keyof Project]}</Text>
              )}
            </DItem>
          ))}

          <DItem label={'Заказчик'}>
            {edit ? (
              <FItem noStyle name="customerId">
                <CustomerSelector allowClear current={project?.customer as Customer} />
              </FItem>
            ) : (
              <Text>{project?.customer?.name}</Text>
            )}
          </DItem>
          <DItem label={'Завод'}>
            {edit ? (
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
