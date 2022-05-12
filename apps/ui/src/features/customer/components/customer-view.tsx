import { useAppDispatch } from '@/app/store';
import { useCustomersQuery } from '@/graphql';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, Table, Typography } from 'antd';
import { FC, useState } from 'react';
import { setEditCustomerId, setShowCreateCustomer } from '../customer.slice';
import { CreateCustomerModal } from './create-customer-modal';
import { UpdateCustomerModal } from './update-customer-modal';

const { Text } = Typography;

export const CustomerView: FC = () => {
  const dispatch = useAppDispatch();

  const [nameFilter, setNameFilter] = useState<string>('');
  const { data, isLoading, isFetching } = useCustomersQuery(
    {
      filter: { name: { contains: nameFilter } },
    },
    { refetchOnMountOrArgChange: true }
  );
  const loading = isLoading || isFetching;

  const dataSource = data?.customers || [];

  return (
    <>
      <Card
        type="inner"
        title={'Заказчики'}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => dispatch(setShowCreateCustomer(true))}
          />
        }
      >
        <Input
          value={nameFilter}
		  placeholder={'Поиск...'}
          onChange={(evt) => setNameFilter(evt.target.value)}
        />
        <Table
          dataSource={dataSource}
          loading={loading}
          bordered
          size="small"
          rowKey="uuid"
          columns={[
            {
              dataIndex: 'editOper',
              width: '48px',
              render: (_, record) => (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => dispatch(setEditCustomerId(record.id))}
                />
              ),
            },
            { title: 'Название', dataIndex: 'name' },
            {
              title: 'Статус',
              dataIndex: 'active',
              render: (_, record) =>
                record.active ? (
                  <Text type="success">Активен</Text>
                ) : (
                  <Text type="danger">Неактивен</Text>
                ),
            },
          ]}
        />
      </Card>
      <CreateCustomerModal />
      <UpdateCustomerModal />
    </>
  );
};
