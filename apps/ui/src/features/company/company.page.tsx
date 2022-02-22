import { Row, Col } from 'antd';
import { FC } from 'react';
import { CustomerView } from '../customer';

export const CompanyPage: FC = () => {
  return (
    <Row gutter={[8, 16]}>
      <Col xs={24} lg={12}>
        <CustomerView />
      </Col>
      {/* <Col xs={24} lg={12}>
                <FactoryView />
            </Col> */}
    </Row>
  );
};
