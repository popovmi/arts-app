import { Art, useAddArtCommentMutation } from '@/graphql';
import { Col, Comment, List, Row, Typography, Input, Button } from 'antd';
import { FC, useState } from 'react';

const { TextArea } = Input;

export const ArtComments: FC<{ art: Art }> = ({ art }) => {
    const [newComment, setNewComment] = useState<string>('');
    const { comments } = art;

    const [addComment, { isError, isLoading, isSuccess }] = useAddArtCommentMutation();

    const handleAddComment = () => {
        addComment({ artCommentInput: { artId: art.id, text: newComment } });
    };

    const AddButton = () => (
        <Button type="primary" onClick={handleAddComment}>
            Добавить
        </Button>
    );

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
            <Col span={24}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                    Добавить комментарий
                </Typography.Title>
                <Row align="bottom" gutter={[8, 8]} justify="start">
                    <Col xs={24} md={16} lg={14}>
                        <TextArea
                            value={newComment}
                            rows={4}
                            style={{ width: '100%' }}
                            maxLength={10}
                            onChange={(evt) => setNewComment(evt.target.value)}
                        />
                    </Col>
                    <Col xs={24} md={0}>
                        <Row justify="end">
                            <AddButton />
                        </Row>
                    </Col>
                    <Col xs={0} md={4} lg={4}>
                        <AddButton />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
