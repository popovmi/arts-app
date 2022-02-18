import { useAppDispatch, useAppSelector } from '@/app/store';
import { ArtResponse, useLazyArtsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { artsLoaded, selectArts, clearFilter } from '..';
import { HeaderCell, HeaderRow, artColumns } from '../components';

export const ArtsListPage: FC = () => {
    const dispatch = useAppDispatch();
    const { filter, order, pagination, arts, hasMore, doFetch } = useAppSelector(selectArts);
    const [load, { isLoading, isFetching }] = useLazyArtsQuery();
    const loading = isLoading || isFetching;

    const fetchArts = () => {
        load({ filter, order, pagination }).then(
            (result) => 'data' in result && dispatch(artsLoaded(result.data!.arts as ArtResponse))
        );
    };

    useEffect(() => {
        if (doFetch) fetchArts();
    }, [doFetch]);

    const [sentryRef, root] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: fetchArts,
        rootMargin: '200px',
        delayInMs: 500,
    });

    return (
        <Row style={{ overflow: 'auto', overflowX: 'hidden', height: '100%' }} ref={root.rootRef}>
            <Table
                dataSource={arts}
                rowKey="id"
                columns={artColumns()}
                components={{ header: { cell: HeaderCell, row: HeaderRow } }}
                pagination={false}
                loading={loading}
                bordered
                scroll={{ x: 1000 }}
                sticky
                title={() => (
                    <Space>
                        <Button
                            icon={<ClearOutlined />}
                            onClick={() => {
                                dispatch(clearFilter());
                            }}
                        />
                    </Space>
                )}
            />
            {arts.length > 0 && hasMore && (
                <Col span={24} ref={sentryRef}>
                    <CenteredSpin />
                </Col>
            )}
        </Row>
    );
};
