import { useAppDispatch, useAppSelector } from '@/app/store';
import { ProjectResponse, useLazyProjectsQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Col, Row, Table } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { projectsLoaded, selectProjects } from '..';
import { HeaderCell, HeaderRow, projectColumns } from '../components';

export const ProjectsListPage: FC = () => {
    const dispatch = useAppDispatch();
    const { filter, order, pagination, projects, hasMore, doFetch } = useAppSelector(selectProjects);
    const [load, { isLoading, isFetching }] = useLazyProjectsQuery();

    const fetchProjects = () => {
        load({ filter, order, pagination }).then(
            (result) => 'data' in result && dispatch(projectsLoaded(result.data!.projects as ProjectResponse))
        );
    };

    useEffect(() => {
        if (doFetch) fetchProjects();
    }, [doFetch]);

    const [sentryRef] = useInfiniteScroll({
        loading: isLoading || isFetching,
        hasNextPage: hasMore,
        onLoadMore: fetchProjects,
    });

    return (
        <Row style={{ overflow: 'auto', overflowX: 'hidden', height: '100%' }}>
            <Table
                dataSource={projects}
                rowKey="id"
                columns={projectColumns()}
                components={{ header: { cell: HeaderCell, row: HeaderRow } }}
                pagination={false}
                bordered
                loading={isLoading || isFetching}
                scroll={{ x: 1000 }}
                sticky
            ></Table>
            {projects.length > 0 && (isLoading || isFetching || hasMore) && (
                <Col span={24} ref={sentryRef}>
                    <CenteredSpin />
                </Col>
            )}
        </Row>
    );
};
