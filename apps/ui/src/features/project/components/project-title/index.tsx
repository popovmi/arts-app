import { useToggle } from '@/shared/hooks';
import { Col, Row, Typography } from 'antd';
import styles from './project-title.module.css';

interface ProjectTitleProps {
    name: string;
    onUpdate: (val: string) => void;
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({ name, onUpdate }) => {
    const [isEdit, toggleIsEdit] = useToggle();
    return (
        <Row style={{ padding: 8 }} gutter={[8, 8]}>
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
                    className={isEdit ? '' : styles['header_name']}
                    onClick={() => toggleIsEdit()}
                    style={isEdit ? { width: 'auto' } : { display: 'inline' }}
                    editable={{
                        enterIcon: false,
                        editing: isEdit,
                        // autoSize: true,
                        onCancel: toggleIsEdit,
                        triggerType: ['text'],
                        onEnd: toggleIsEdit,
                        onChange: (value) => {
                            if (value !== name) {
                                onUpdate(value);
                            }
                            toggleIsEdit();
                        },
                    }}
                >
                    {name}
                </Typography.Title>
            </Col>
        </Row>
    );
};
