import { useAppDispatch } from '@/app/store';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { FC } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useNavigate } from 'react-router-dom';
import { setPreview } from '../art.slice';
import { ArtColumnsMenu, HeaderCell, HeaderRow, TableBody, useArtColumns } from '../components';
import { ArtPreviewModal } from '../components/art-preview.modal';
import { useArtsData } from '../hooks';

export const ArtsListPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { arts, loading, hasMore, showColumns, fetchArts, resetFilter, preview } = useArtsData();
    const columns = useArtColumns();
    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: fetchArts,
        delayInMs: 100,
    });
    const scroll = { x: showColumns.find((col) => col === 'project') ? 2500 : showColumns.length * 130 };
    const onPreviewModalCancel = () => dispatch(setPreview({ artId: undefined, visible: false }));

    return (
        <>
            <ArtPreviewModal
                arts={arts}
                openArtId={preview.artId}
                visible={preview.visible}
                fetchArts={fetchArts}
                hasMore={hasMore}
                onCancel={onPreviewModalCancel}
                loading={loading}
            />
            <Row /* ref={root.rootRef} */>
                <Col
                    xs={24}
                    style={{
                        position: 'fixed',
                        height: '40px',
                        zIndex: 1,
                        width: '100%',
                        backgroundColor: '#fff',
                    }}
                >
                    <Space style={{ width: '100%', padding: 8 }}>
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
                            <Button size="small" icon={<ClearOutlined />} onClick={resetFilter} />
                        </Tooltip>
                        <Tooltip title="Показать/скрыть столбцы">
                            <ArtColumnsMenu />
                        </Tooltip>
                    </Space>
                </Col>
                <Col xs={24} style={{ marginTop: '40px' }}>
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
                        pagination={false}
                        size="small"
                        bordered
                        loading={arts.length === 0 && loading}
                        scroll={scroll}
                        sticky={{ offsetHeader: 80 }}
                    />
                </Col>
                {arts.length > 0 && hasMore && (
                    <Col span={24} ref={sentryRef}>
                        <CenteredSpin />
                    </Col>
                )}
            </Row>
        </>
    );
};
