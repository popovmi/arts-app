import { useToggle } from '@/shared/hooks';
import { Typography } from 'antd';
import { useState } from 'react';

interface ProjectTitleProps {
    name: string;
    onUpdate: (val: string) => void;
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({ name, onUpdate }) => {
    const [isEdit, setIsEdit] = useToggle();
    const [newName, setNewName] = useState<string>(name);

    return (
        <>
            <Typography.Title level={1} type="secondary" style={{ display: 'inline' }}>
                Проект{' '}
            </Typography.Title>
            <Typography.Title level={1} style={{ display: 'inline' }} onClick={() => setIsEdit()}>
                {name}
            </Typography.Title>
            {isEdit ? 'da' : 'net'}
        </>
    );
};
