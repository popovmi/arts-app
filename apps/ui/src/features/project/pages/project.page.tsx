import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const ProjectPage: FC = () => {
    const { projectId } = useParams();

    return <div>project {projectId}</div>;
};
