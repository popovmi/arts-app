import { ArtDescriptions } from '@/features/art/components';
import { Art, Project, useProjectQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { MehOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, PageHeader, Result, Row, Tabs, Tooltip, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProjectDescriptions } from '../components';

export const ProjectPage: FC = () => {
    const { projectId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useProjectQuery({ id: projectId! });
    const loading = isLoading || isFetching;

    const project = (data?.project || {}) as Project;
    const arts = data?.project.arts || [];

    if (loading) return <CenteredSpin />;
    if (!project) return <Result title="Проект не найден" status={'404'} />;

    return (
        <>
            <PageHeader
                title={
                    <Typography.Title level={1} className="ant-col ant-col-24">
                        {project.name}
                    </Typography.Title>
                }
                onBack={() => navigate(-1)}
            >
                <ProjectDescriptions project={project} />
            </PageHeader>
            <Divider />
            <Row gutter={8}>
                <Typography.Title level={2} className="ant-col ant-col-24">
                    ART-ы
                </Typography.Title>
                <Col span={24}>
                    <Tabs tabPosition={'left'} activeKey={searchParams.get('artId') || ''}>
                        {arts.map((a) => (
                            <Tabs.TabPane
                                tab={
                                    <>
                                        <Tooltip title="Показать">
                                            <Button type="link" onClick={() => setSearchParams({ artId: a.id })}>
                                                {a.name}
                                            </Button>
                                        </Tooltip>
                                        <Divider type="vertical" />
                                        <Tooltip title="Перейти к ART-у">
                                            <Button
                                                type="link"
                                                size="small"
                                                onClick={() => navigate(`/arts/${a.id}`)}
                                                icon={<ArrowRightOutlined />}
                                            />
                                        </Tooltip>
                                    </>
                                }
                                key={a.id}
                            >
                                <Row gutter={8}>
                                    <Col span={24}>
                                        <ArtDescriptions art={{ ...a, project } as Art} editable={false} />
                                    </Col>
                                    <Col span={24}>
                                        {a.files?.length && (
                                            <img
                                                style={{ maxWidth: '100%' }}
                                                src={`/static/${a.files[0].watermarkPath}`}
                                                alt={'Изображение ART-a'}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Col>
                {!arts.length && <Result icon={<MehOutlined />} title="В проект пока не добавлен ни один ART" />}
            </Row>
        </>
    );
};
