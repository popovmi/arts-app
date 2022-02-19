import { useAppDispatch, useAppSelector } from '@/app/store';
import { ArtResponse, useLazyArtsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { artsLoaded, clearFilter, selectArts } from '..';
import { artColumns, ArtColumnsMenu, HeaderCell, HeaderRow, TableBody } from '../components';

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
        <Row style={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }} ref={root.rootRef}>
            <Table
                dataSource={arts}
                rowKey="id"
                columns={artColumns()}
                components={{
                    header: { cell: HeaderCell, row: HeaderRow },
                    body: {
                        wrapper: TableBody,
                    },
                }}
                pagination={false}
                loading={loading}
                size="small"
                bordered
                scroll={{ x: 2500 }}
                sticky
                title={() => (
                    <Space style={{ width: '100%' }}>
                        <Button
                            size="small"
                            icon={<ClearOutlined />}
                            onClick={() => {
                                dispatch(clearFilter());
                            }}
                        />
                        <ArtColumnsMenu />
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
