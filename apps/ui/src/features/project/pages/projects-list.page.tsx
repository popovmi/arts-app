import { useAppDispatch, useAppSelector } from '@/app/store';
import { ProjectResponse, useLazyProjectsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useNavigate } from 'react-router-dom';
import { clearFilter, projectsLoaded, selectProjects } from '..';
import { HeaderCell, HeaderRow } from '../components';
import { useProjectColumns } from '../hooks';

export const ProjectsListPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { filter, order, pagination, projects, hasMore, doFetch } = useAppSelector(selectProjects);
    const [load, { isLoading, isFetching }] = useLazyProjectsQuery();
    const loading = isLoading || isFetching;

    const fetchProjects = () => {
        load({ filter, order, pagination }).then(
            (result) => 'data' in result && dispatch(projectsLoaded(result.data!.projects as ProjectResponse))
        );
    };

    useEffect(() => {
        if (doFetch) fetchProjects();
    }, [doFetch]);

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: fetchProjects,
        delayInMs: 500,
    });

    const columns = useProjectColumns();
    return (
        <Row>
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
                    <Tooltip title="Создать проект">
                        <Button
                            size="small"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                navigate('/projects/create');
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Сбросить фильтры">
                        <Button
                            icon={<ClearOutlined />}
                            size="small"
                            onClick={() => {
                                dispatch(clearFilter());
                            }}
                        />
                    </Tooltip>
                </Space>
            </Col>
            <Col xs={24} style={{ marginTop: '40px' }}>
                <Table
                    dataSource={projects}
                    rowKey="id"
                    columns={columns}
                    components={{ header: { cell: HeaderCell, row: HeaderRow } }}
                    pagination={false}
                    bordered
                    sticky={{ offsetHeader: 80 }}
                    scroll={{ x: 1000 }}
                    size="small"
                />
            </Col>
            {hasMore && (
                <Col span={24} ref={sentryRef}>
                    <CenteredSpin />
                </Col>
            )}
        </Row>
    );
};
