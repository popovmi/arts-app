import { Art, useArtQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Col, PageHeader, Result, Row, Typography, Divider } from 'antd';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtDescriptions, ArtComments } from '../components';

export const ArtPage: FC = () => {
    const { artId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching } = useArtQuery({ id: artId! });
    const loading = isLoading || isFetching;

    const art = data?.art as Art;

    if (loading) return <CenteredSpin />;
    if (!art) return <Result title="ART не найден" status={'404'} />;

    return (
        <>
            <PageHeader
                title={
                    <span>
                        <Typography.Title level={1} type="secondary" style={{ display: 'inline' }}>
                            ART{' '}
                        </Typography.Title>
                        <Typography.Title level={1} style={{ display: 'inline' }}>
                            {art.name}
                        </Typography.Title>
                    </span>
                }
                onBack={() => navigate(-1)}
            ></PageHeader>
            <Row style={{ padding: 8 }} gutter={[8, 8]}>
                <Col xs={24} lg={8}>
                    <ArtDescriptions art={art} />
                </Col>
                <Col xs={24} lg={16}>
                    {art.files?.length && (
                        <img
                            style={{ maxWidth: '100%' }}
                            src={`/static/${art.files[0].watermarkPath}`}
                            alt={'Изображение ART-a'}
                        />
                    )}
                </Col>
                <Divider orientation={'left'} style={{ margin: 0 }}>
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Комментарии
                    </Typography.Title>
                </Divider>
                <Col span={24}>
                    <ArtComments art={art} />
                </Col>
            </Row>
        </>
    );
};
