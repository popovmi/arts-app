import { useToggle } from '@/shared/hooks';
import { EditOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { useState } from 'react';
import styles from './project-title.module.css';

interface ProjectTitleProps {
    name: string;
    onUpdate: (val: string) => void;
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({ name, onUpdate }) => {
    const [isEdit, toggleIsEdit] = useToggle();
    return (
        <Space style={{ width: '100%', padding: 4 }}>
            <Typography.Title
                className={styles['unselectable']}
                level={1}
                type="secondary"
                style={{ display: 'inline' }}
            >
                Проект{' '}
            </Typography.Title>
            <Typography.Title
                level={1}
                className={isEdit ? '' : styles['header_name']}
                onClick={() => toggleIsEdit()}
                style={{ display: 'inline' }}
                editable={{
                    editing: isEdit,
                    onCancel: toggleIsEdit,
                    triggerType: ['text'],
                    onEnd: toggleIsEdit,
                    onChange: (value) => {
                        onUpdate(value);
                        toggleIsEdit();
                    },
                }}
            >
                {name}
            </Typography.Title>
        </Space>
    );
};
