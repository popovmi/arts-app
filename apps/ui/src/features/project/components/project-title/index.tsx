import { Project, useUpdateProjectMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { EditOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import styles from './project-title.module.css';

interface ProjectTitleProps {
    project: Project;
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({ project }) => {
    const [isEdit, toggleIsEdit] = useToggle();

    const [update, { isLoading: isUpdating }] = useUpdateProjectMutation({
        fixedCacheKey: 'updateProjectName',
    });

    const handleUpdate = (val: string) =>
        update({
            updateProjectInput: {
                id: project.id,
                name: val,
                hasDesignDoc: project.hasDesignDoc,
                internal: project.internal,
                customerId: project?.customer?.id,
                factoryId: project?.factory?.id,
                dropNumber: project.dropNumber,
                sfm: project.sfm,
                intercenter: project.intercenter,
            },
        });

    return (
        <Row style={{ padding: '0 8px', height: '40px' }} gutter={[8, 8]}>
            <Col flex="none">
                <Typography.Title
                    className={styles['unselectable']}
                    level={1}
                    type="secondary"
                    style={{ display: 'inline' }}
                >
                    Проект{' '}
                </Typography.Title>
            </Col>
            <Col flex={1}>
                <Typography.Title
                    level={1}
                    onClick={() => !isUpdating && toggleIsEdit()}
                    style={isEdit ? {} : { display: 'inline' }}
                    editable={{
                        icon: <EditOutlined spin={isUpdating} />,
                        triggerType: ['icon'],
                        editing: isEdit,
                        onCancel: toggleIsEdit,
                        onEnd: toggleIsEdit,
                        onChange: (value) => {
                            if (value !== project.name) {
                                handleUpdate(value);
                            }
                            toggleIsEdit();
                        },
                    }}
                >
                    {project.name}
                </Typography.Title>
            </Col>
        </Row>
    );
};
