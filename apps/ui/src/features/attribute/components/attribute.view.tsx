import { useAppDispatch } from '@/app/store';
import { AttributeType, useAttributesQuery, useUpdateAttributesOrderMutation } from '@/graphql';
import { useMediaQuery } from '@/shared/hooks';
import { EditOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, message, Popover, Table, Tabs, Typography } from 'antd';
import { FC, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { AttributesLabels, CreateAttributeForm } from '..';
import { setEditInfo } from '../attribute.slice';
import styles from './attribute.module.less';

const { TabPane } = Tabs;
const { Text } = Typography;

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = SortableElement(
  (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableRowElement> &
      React.HTMLAttributes<HTMLTableRowElement>
  ) => <tr {...props} />
);
const SortableBody = SortableContainer(
  (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableSectionElement> &
      React.HTMLAttributes<HTMLTableSectionElement>
  ) => <tbody {...props} />
);

interface AttributeListProps {
  type: AttributeType;
}

const AttributeList: FC<AttributeListProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch } = useAttributesQuery({ type });
  const attributes = data?.attributes || [];
  const [updateOrder, { isLoading: isUpdatingOrder }] = useUpdateAttributesOrderMutation();

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex)
      updateOrder({ input: { type, oldOrder: oldIndex, newOrder: newIndex } }).then((result) => {
        if ('data' in result) {
          message.success('Порядок изменён!');
          refetch();
        }
      });
  };

  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass={styles['row-dragging']}
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = attributes?.find((x) => x.valueOrder === restProps['data-row-key'])?.valueOrder;

    return <SortableItem index={index || (attributes.length || 0) + 1} {...restProps} />;
  };
  const loading = isLoading || isUpdatingOrder;

  return (
    <Card
      title={AttributesLabels[type]}
      extra={
        <Popover
          content={<CreateAttributeForm type={type} onSuccess={() => refetch()} />}
          trigger="click"
          placement="left"
        >
          <Button type="primary" icon={<PlusOutlined />} />
        </Popover>
      }
    >
      <Table
        dataSource={attributes}
        bordered
        showHeader={false}
        size="small"
        pagination={false}
        loading={loading}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
        rowKey="valueOrder"
        columns={[
          {
            dataIndex: 'editOper',
            width: '48px',
            render: (_, { id }) => (
              <Button icon={<EditOutlined />} onClick={() => dispatch(setEditInfo({ id, type }))} />
            ),
          },
          {
            dataIndex: 'name',
          },
          {
            dataIndex: 'active',
            render: (_, record) =>
              record.active ? <Text type="success">Активен</Text> : <Text type="danger">Неактивен</Text>,
          },
          {
            dataIndex: 'sort',
            align: 'center',
            width: '48px',
            className: styles['drag-visible'],
            render: () => <DragHandle />,
          },
        ]}
      ></Table>
    </Card>
  );
};

interface AttributesInfo {
  title: string;
  types: AttributeType[];
}

interface AttributesViewProps {
  attributeInfo: AttributesInfo;
}

export const AttributeView: FC<AttributesViewProps> = ({ attributeInfo: { title, types } }) => {
  const [width] = useMediaQuery();
  const [selectedAttributeValue, setSelectedAttributeValue] = useState<string>(types[0]);

  return (
    <Card title={title} type="inner">
      <Tabs
        tabPosition={width < 756 ? 'top' : 'left'}
        activeKey={selectedAttributeValue}
        onTabClick={(tabKey) => setSelectedAttributeValue(tabKey)}
      >
        {types.map((type) => (
          <TabPane tab={AttributesLabels[type]} key={type}>
            <AttributeList type={type} />
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};
