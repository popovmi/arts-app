import { Art } from '@/graphql';
import { Row, Typography, Col, Comment, List } from 'antd';
import { FC } from 'react';

export const ArtComments: FC<{ art: Art }> = ({ art }) => {
  const { comments = [] } = art;

  return (
    <Row>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={comments || []}
          renderItem={(item) => (
            <li>
              <Comment author={item.author.fullName} content={item.text} />
            </li>
          )}
        ></List>
      </Col>
    </Row>
  );
};
