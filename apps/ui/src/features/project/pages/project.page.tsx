import { Project, useProjectQuery, useUpdateProjectMutation } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Col, Divider, PageHeader, Result, Row, Space, Typography } from 'antd';
import { FC, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProjectDescriptions } from '../components';
import { ProjectComments } from '../components/project-comments.list';
import { ProjectTitle } from '../components/project-title';

export const ProjectPage: FC = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useProjectQuery({ id: projectId! });
    const [update, { isLoading: isUpdating, isSuccess, reset }] = useUpdateProjectMutation({
        fixedCacheKey: 'updateProjectName',
    });

    const loading = isLoading || isFetching;
    const project = (data?.project || {}) as Project;
    const arts = data?.project.arts || [];

    const [currentArt, setCurrentArt] = useState(arts[0]?.id || '');

    if (loading) return <CenteredSpin />;
    if (!project) return <Result title="Проект не найден" status={'404'} />;

    return (
        <>
            <PageHeader
                title={
                    <ProjectTitle
                        name={project.name}
                        onUpdate={(val) => update({ updateProjectInput: { id: project.id, name: val } })}
                    />
                }
                onBack={() => navigate(-1)}
            ></PageHeader>

            <Row gutter={8} style={{ paddingInline: 8 }}>
                <Col xs={24} lg={6}>
                    <ProjectDescriptions project={project} />
                </Col>
                <Col xs={24} lg={18}>
                    <Divider orientation={'left'} style={{ margin: 0 }}>
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            ART-ы
                        </Typography.Title>
                    </Divider>
                    <Space>
                        {arts.map((a) => (
                            <Link key={a.id} to={`/arts/${a.id}`}>
                                {a.name}
                            </Link>
                        ))}
                    </Space>
                    <Divider orientation={'left'} style={{ margin: 0 }}>
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            Комментарии
                        </Typography.Title>
                    </Divider>
                    <ProjectComments project={project} />
                </Col>
            </Row>
        </>
    );
};
