import { useAppDispatch, useAppSelector } from '@/app/store';
import { ArtPreviewModal } from '@/features/art/components';
import { Project, useProjectQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Result, Row, Space, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectComments, ProjectDescriptions, ProjectTitle } from '../components';
import { setArtPreview } from '../project.slice';

export const ProjectPage: FC = () => {
    const dispatch = useAppDispatch();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useProjectQuery({ id: projectId! });
    const { artPreview } = useAppSelector((state) => state.project);
    const loading = isLoading || isFetching;
    const project = (data?.project || {}) as Project;
    const arts = project.arts || [];
    const onPreviewModalCancel = () => dispatch(setArtPreview({ artId: undefined, visible: false }));

    useEffect(() => {
        console.log('f');
        return () => {
            dispatch(setArtPreview({ artId: undefined, visible: false }));
        };
    }, []);

    if (loading) return <CenteredSpin />;
    if (!project) return <Result title="Проект не найден" status={'404'} />;

    return (
        <>
            <ArtPreviewModal
                arts={arts}
                openArtId={artPreview.artId}
                visible={artPreview.visible}
                onCancel={onPreviewModalCancel}
            />
            <Row
                align="middle"
                style={{
                    padding: '0 8px',
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    backgroundColor: '#fff',
                    height: '40px',
                }}
                gutter={[8, 8]}
            >
                <Col flex={'none'}>
                    <ArrowLeftOutlined style={{ fontSize: '16px' }} onClick={() => navigate(-1)} />
                </Col>
                <Col flex={1}>
                    <ProjectTitle project={project} />
                </Col>
            </Row>

            <Row style={{ padding: '0 8px', marginTop: '48px' }} gutter={[8, 8]}>
                <Divider style={{ margin: 0 }} />
                <Col xs={24} lg={6}>
                    <ProjectDescriptions project={project} />
                </Col>
                <Col xs={24} lg={18}>
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        ART-ы
                    </Typography.Title>
                    <Space>
                        {arts.map((a) => (
                            <Button
                                key={a.id}
                                onClick={() => dispatch(setArtPreview({ artId: a.id, visible: true }))}
                                type="link"
                            >
                                {a.name}
                            </Button>
                        ))}
                    </Space>
                </Col>
                <Divider orientation={'left'} style={{ margin: 0 }}>
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Комментарии
                    </Typography.Title>
                </Divider>
                <Col span={24}>
                    <ProjectComments project={project} />
                </Col>
            </Row>
        </>
    );
};
