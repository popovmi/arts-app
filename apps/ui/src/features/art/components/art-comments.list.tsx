import { Art, useAddArtCommentMutation } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Button, Col, Comment, Input, List, Row, Typography } from 'antd';
import { FC, useState } from 'react';
import { ArtCommentView } from './art.comment';

const { TextArea } = Input;

export const ArtComments: FC<{ art: Art }> = ({ art }) => {
    const [newComment, setNewComment] = useState<string>('');
    const { comments } = art;

    const [addComment, { isError, isLoading, isSuccess }] = useAddArtCommentMutation();

    const handleAddComment = () => {
        addComment({ artCommentInput: { artId: art.id, text: newComment } }).then(() => setNewComment(''));
    };

    const AddButton = () => (
        <Button type="primary" onClick={handleAddComment}>
            Добавить
        </Button>
    );

    return (
        <CenteredSpin wrapperClassName={'ant-col ant-col-xs-24'} spinning={isLoading}>
            <Row style={{ width: '100%', padding: '0 24 24 24' }}>
                <Col span={24} style={{ maxHeight: 400, overflowY: 'auto' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={comments || []}
                        renderItem={(item) => <ArtCommentView comment={item} />}
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
        </CenteredSpin>
    );
};
