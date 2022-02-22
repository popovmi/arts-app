import { Art, useArtQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Col, PageHeader, Result, Row, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtDescriptions } from '../components';

export const ArtPage: FC = () => {
  const { artId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useArtQuery({ id: artId! });
  const loading = isLoading || isFetching;

  const art = (data?.art || {}) as Art;

  if (loading) return <CenteredSpin />;
  if (!art) return <Result title="ART не найден" status={'404'} />;

  return (
    <>
      <PageHeader
        title={
          <Typography.Title level={1} className="ant-col ant-col-24">
            {art.name}
          </Typography.Title>
        }
        onBack={() => navigate(-1)}
      >
        <ArtDescriptions art={art} />
      </PageHeader>
      <Row style={{ padding: 8 }}>
        <Col span={24}>
          {art.files?.length && (
            <img
              style={{ maxWidth: '100%' }}
              src={`/static/${art.files[0].watermarkPath}`}
              alt={'Изображение ART-a'}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
