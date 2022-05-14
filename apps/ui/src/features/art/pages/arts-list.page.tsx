import { useAppDispatch, useAppSelector } from '@/app/store';
import { Art, ArtResponse, useLazyArtsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, TableColumnGroupType, Tooltip } from 'antd';
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
    const columns = artColumns();
    return (
        <Row style={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }} ref={root.rootRef}>
            <Table
                dataSource={arts}
                rowKey="id"
                columns={columns}
                components={{
                    header: { cell: HeaderCell, row: HeaderRow },
                    body: {
                        wrapper: TableBody,
                    },
                }}
                summary={(pageData) => (
                    <Table.Summary fixed={'top'}>
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                colSpan={
                                    columns.length +
                                    columns
                                        .filter((col) => !!(col as TableColumnGroupType<Art>).children)
                                        .reduce(
                                            (childrenLength, column) =>
                                                childrenLength +
                                                (column as TableColumnGroupType<Art>).children.length -
                                                1,
                                            0
                                        )
                                }
                            >
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
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                pagination={false}
                loading={loading}
                size="small"
                bordered
                scroll={scroll}
                sticky
            />
            {arts.length > 0 && hasMore && (
                <Col span={24} ref={sentryRef}>
                    <CenteredSpin />
                </Col>
            )}
        </Row>
    );
};
