import { Col, Row } from 'antd';
import { FC } from 'react';
import { ProjectNavigation } from './project.navigation';

export const ProjectHeader: FC = () => {
  return (
    <Row gutter={8}>
      <Col flex={1}>
        <ProjectNavigation />
      </Col>
    </Row>
  );
};
