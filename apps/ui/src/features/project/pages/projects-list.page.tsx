import { useAppDispatch, useAppSelector } from '@/app/store';
import { ProjectResponse, useLazyProjectsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useNavigate } from 'react-router-dom';
import { clearFilter, projectsLoaded, selectProjects } from '..';
import { HeaderCell, HeaderRow, projectColumns } from '../components';

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

    const [sentryRef, root] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: fetchProjects,
        rootMargin: '200px',
        delayInMs: 500,
    });

    return (
        <Row style={{ overflow: 'auto', overflowX: 'hidden', height: '100%' }} ref={root.rootRef}>
            <Table
                dataSource={projects}
                rowKey="id"
                columns={projectColumns()}
                components={{ header: { cell: HeaderCell, row: HeaderRow } }}
                pagination={false}
                loading={loading}
                bordered
				sticky
                scroll={{ x: 1000 }}
                size="small"
                title={() => (
                    <Space style={{ width: '100%' }}>
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
                                size="small"
                                icon={<ClearOutlined />}
                                onClick={() => {
                                    dispatch(clearFilter());
                                }}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
            {projects.length > 0 && hasMore && (
                <Col span={24} ref={sentryRef}>
                    <CenteredSpin />
                </Col>
            )}
        </Row>
    );
};
