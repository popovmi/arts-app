import { useAppDispatch, useAppSelector } from '@/app/store';
import { UserResponse, useLazyUsersQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { FC, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { clearFilter, usersLoaded, selectUsers, setShowCreateUser } from '..';
import { UpdateUserModal, HeaderCell, HeaderRow, userColumns, CreateUserModal } from '../components';

export const UsersListPage: FC = () => {
    const dispatch = useAppDispatch();
    const { filter, order, pagination, users, hasMore, doFetch, editUserId } = useAppSelector(selectUsers);
    const [load, { isLoading, isFetching }] = useLazyUsersQuery();
    const loading = isLoading || isFetching;

    const fetchUsers = () => {
        load({ filter, order, pagination }).then(
            (result) => 'data' in result && dispatch(usersLoaded(result.data!.users as UserResponse))
        );
    };

    useEffect(() => {
        if (doFetch) fetchUsers();
    }, [doFetch]);

    const [sentryRef, root] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: fetchUsers,
        rootMargin: '200px',
        delayInMs: 500,
    });

    return (
        <Row style={{ overflow: 'auto', overflowX: 'hidden', height: '100%' }} ref={root.rootRef}>
            <Table
                dataSource={users}
                rowKey="id"
                columns={userColumns()}
                components={{ header: { cell: HeaderCell, row: HeaderRow } }}
                pagination={false}
                loading={loading}
                bordered
                sticky
                scroll={{ x: 1000 }}
                size="small"
                title={() => (
                    <Space style={{ width: '100%' }}>
                        <Tooltip title="Создать пользователя">
                            <Button
                                size="small"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    dispatch(setShowCreateUser(true));
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
            {users.length > 0 && hasMore && (
                <Col span={24} ref={sentryRef}>
                    <CenteredSpin />
                </Col>
            )}
            <CreateUserModal />
            {editUserId && <UpdateUserModal />}
        </Row>
    );
};
