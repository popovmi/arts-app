import { Project, useProjectQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { PageHeader, Result } from 'antd';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDescriptions } from '../components';

export const ProjectPage: FC = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useProjectQuery({ id: projectId! });
    const loading = isLoading || isFetching;

    const project = (data?.project || {}) as Project;

    if (loading) return <CenteredSpin />;
    if (!project) return <Result title="Проект не найден" status={'404'} />;

    return (
        <PageHeader title={project && `${project.name}`} onBack={() => navigate(-1)}>
            <ProjectDescriptions project={project} />
        </PageHeader>
    );
};
