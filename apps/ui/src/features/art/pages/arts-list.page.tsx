import { useAppDispatch, useAppSelector } from '@/app/store';
import { ArtResponse, useLazyArtsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useNavigate } from 'react-router-dom';
import { artsLoaded, clearFilter, selectArts } from '..';
import { artColumns, ArtColumnsMenu, HeaderCell, HeaderRow, TableBody } from '../components';

export const ArtsListPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { filter, order, pagination, arts, hasMore, doFetch, showColumns } = useAppSelector(selectArts);
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
        delayInMs: 100,
    });

    const scroll = { x: showColumns.find((col) => col === 'project') ? 2500 : showColumns.length * 130 };

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
                scroll={scroll}
                sticky
                title={() => (
                    <Space style={{ width: '100%' }}>
                        <Tooltip title="Создать ART">
                            <Button
                                size="small"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    navigate('/arts/create');
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Сбросить фильтры">
                            <Button
                                size="small"
                                icon={<ClearOutlined />}
                                onClick={() => {
                                    dispatch(clearFilter());
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Показать/скрыть столбцы">
                            <ArtColumnsMenu />
                        </Tooltip>
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
