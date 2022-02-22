import { Col, Row } from 'antd';
import { FC } from 'react';
import { ArtNavigation } from './art.navigation';

export const ArtHeader: FC = () => {
  return (
    <Row gutter={8}>
      <Col flex={1}>
        <ArtNavigation />
      </Col>
    </Row>
  );
};
