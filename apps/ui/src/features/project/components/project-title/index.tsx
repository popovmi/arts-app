import { useAppDispatch } from '@/app/store';
import { Project, useDeleteProjectMutation, useUpdateProjectMutation } from '@/graphql';
import { useToggle, useUser } from '@/shared/hooks';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { clearFilter } from '../../project.slice';
import styles from './project-title.module.css';

interface ProjectTitleProps {
    project: Project;
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({ project }) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [isEdit, toggleIsEdit] = useToggle();

    const [update, { isLoading: isUpdating }] = useUpdateProjectMutation({
        fixedCacheKey: 'updateProjectName',
    });

    const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation({
        fixedCacheKey: 'deleteArt',
    });

    const { isAdmin } = useUser();

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

    const handleDelete = () => {
        Modal.confirm({
            title: 'Удалить проект и ART-ы?',
            onOk: () => {
                deleteProject({ id: project.id }).then(() => {
                    navigate('/projects');
                    dispatch(clearFilter());
                });
            },
        });
    };

    const loading = isUpdating || isDeleting;

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
            {isAdmin && (
                <Col flex="none">
                    <Button style={{ marginTop: '8px' }} danger onClick={handleDelete} loading={loading}>
                        Удалить проект
                    </Button>
                </Col>
            )}
        </Row>
    );
};
