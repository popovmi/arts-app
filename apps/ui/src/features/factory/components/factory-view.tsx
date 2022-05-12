import { useAppDispatch } from '@/app/store';
import { useFactoriesQuery } from '@/graphql';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, Table, Typography } from 'antd';
import { FC, useState } from 'react';
import { setEditFactoryId, setShowCreateFactory } from '../factory.slice';
import { CreateFactoryModal } from './create-factory-modal';
import { UpdateFactoryModal } from './update-factory-modal';

const { Text } = Typography;

export const FactoryView: FC = () => {
  const dispatch = useAppDispatch();

  const [nameFilter, setNameFilter] = useState<string>('');
  const { data, isLoading, isFetching } = useFactoriesQuery(
    {
      filter: { name: { contains: nameFilter } },
    },
    { refetchOnMountOrArgChange: true }
  );
  const loading = isLoading || isFetching;

  const dataSource = data?.factories || [];

  return (
    <>
      <Card
        type="inner"
        title={'Заводы'}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => dispatch(setShowCreateFactory(true))}
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
                  onClick={() => dispatch(setEditFactoryId(record.id))}
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
      <CreateFactoryModal />
      <UpdateFactoryModal />
    </>
  );
};
