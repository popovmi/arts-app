import { Row, Spin } from 'antd';
import { FC } from 'react';

export const CenteredSpin: FC = () => {
  return (
    <Row style={{ height: '100%' }} justify='center' align='middle'>
      <Spin />;
    </Row>
  );
};
