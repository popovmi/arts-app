import { Row, Spin, SpinProps } from 'antd';
import { FC } from 'react';

export const CenteredSpin: FC<SpinProps> = (props) => {
  return (
    <Row style={{ height: '100%' }} justify="center" align="middle">
      <Spin {...props} />;
    </Row>
  );
};
