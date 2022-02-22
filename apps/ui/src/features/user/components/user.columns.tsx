import { useAppDispatch, useAppSelector } from '@/app/store';
import { useUser } from '@/shared/hooks';
import { BooleanFieldOption, Role, User, UserFilterQuery } from '@/graphql';
import { EditOutlined } from '@ant-design/icons';
import {
  Typography,
  Button,
  Col,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  TableColumnProps,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC, HTMLAttributes, useEffect } from 'react';
import { selectUsers, setEditUserId, shouldFetch, updateFilter } from '..';

const { Text } = Typography;

interface UserFilterItemProps {
  value: any;
  onChange: (value: any) => void;
  onClear: () => void;
  disableClear: boolean;
  withTimer: boolean;
}

const UserFilterInput: FC<UserFilterItemProps> = ({
  onChange,
  value,
  onClear,
  disableClear,
  withTimer,
}) => {
  let timer: NodeJS.Timeout;
  const dispatch = useAppDispatch();

  const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement> | CheckboxChangeEvent) => {
    if (withTimer) clearTimeout(timer);
    onChange(evt.target.value);
    if (withTimer) timer = setTimeout(() => dispatch(shouldFetch(true)), 800);
  };

  useEffect(() => {
    if (withTimer) return () => clearTimeout(timer);

    return;
  }, []);

  return (
    <Row gutter={[8, 8]} style={{ padding: 8, width: 250 }}>
      <Col xs={24}>
        <Input value={value || ''} onChange={onChangeValue} />
      </Col>
      <Col xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          type="link"
          size="small"
          disabled={disableClear}
          onClick={(evt) => {
            onClear();
          }}
        >
          Сбросить
        </Button>
      </Col>
    </Row>
  );
};

export const userColumns = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(selectUsers);
  const { user: currentUser } = useUser();

  const getYesNoFilter = (dataIndex: keyof UserFilterQuery) => () => {
    const onChange = (e: RadioChangeEvent) => {
      dispatch(
        updateFilter({
          [dataIndex]: typeof e.target.value === 'boolean' ? { is: e.target.value } : {},
          shouldFetch: true,
        })
      );
    };

    const filterProp = filter[dataIndex] as BooleanFieldOption;

    return (
      <Row gutter={[8, 8]} style={{ padding: 8, width: 250 }} justify="space-between">
        <Col flex="none">
          <Radio.Group
            value={typeof filterProp?.is === 'boolean' ? filterProp.is : undefined}
            onChange={onChange}
          >
            <Radio value={true}>Да</Radio>
            <Radio value={false}>Нет</Radio>
          </Radio.Group>
        </Col>
        <Col flex={1} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            type="link"
            size="small"
            disabled={typeof filterProp?.is !== 'boolean'}
            onClick={(evt) => {
              dispatch(updateFilter({ [dataIndex]: {}, shouldFetch: true }));
            }}
          >
            Сбросить
          </Button>
        </Col>
      </Row>
    );
  };

  const userColumns: TableColumnProps<User>[] = [
    {
      dataIndex: 'editOper',
      width: '48px',
      render: (_: any, record: User) =>
        record.id !== currentUser!.id && (
          <Button icon={<EditOutlined />} onClick={() => dispatch(setEditUserId(record.id))} />
        ),
      fixed: true,
    },
    {
      onHeaderCell: (record) => ({ dataIndex: 'name' } as HTMLAttributes<any>),
      dataIndex: 'username',
      fixed: true,
      title: 'Логин',
      filteredValue: filter?.username?.contains ? [filter.username.contains] : [],
      filterDropdown: () => (
        <UserFilterInput
          disableClear={!filter.username?.contains}
          onClear={() => dispatch(updateFilter({ username: {}, shouldFetch: true }))}
          onChange={(value) =>
            dispatch(
              updateFilter({
                username: value ? { contains: value } : {},
                shouldFetch: false,
              })
            )
          }
          value={filter?.username?.contains || ''}
          withTimer={true}
        />
      ),

      filterMultiple: false,
    },
    {
      onHeaderCell: (record) => ({ dataIndex: 'fullName' } as HTMLAttributes<any>),
      dataIndex: 'fullName',
      fixed: true,
      title: 'Полное имя',
      filteredValue: filter?.fullName?.contains ? [filter.fullName.contains] : [],
      filterDropdown: () => (
        <UserFilterInput
          disableClear={!filter.fullName?.contains}
          onClear={() => dispatch(updateFilter({ fullName: {}, shouldFetch: true }))}
          onChange={(value) =>
            dispatch(
              updateFilter({
                fullName: value ? { contains: value } : {},
                shouldFetch: false,
              })
            )
          }
          value={filter?.fullName?.contains || ''}
          withTimer={true}
        />
      ),
      filterMultiple: false,
    },
    {
      dataIndex: 'active',
      title: 'Статус',
      onHeaderCell: (record) => ({ dataIndex: 'active' } as HTMLAttributes<any>),
      filteredValue: typeof filter.active?.is === 'boolean' ? [filter.active.is] : [],
      filterDropdown: getYesNoFilter('active'),
      filterMultiple: false,
      render: (_, { active }) =>
        active ? <Text type="success">Активен</Text> : <Text type="danger">Неактивен</Text>,
    },
    {
      dataIndex: 'role',
      title: 'Роль',
      onHeaderCell: (record) => ({ dataIndex: 'role' } as HTMLAttributes<any>),
      filteredValue: filter.role?.is ? [filter.role.is] : [],
      filterDropdown: () => {
        return (
          <Row gutter={[8, 8]} style={{ padding: 8, width: 250 }} justify="space-between">
            <Col flex="1">
              <Select
                style={{ width: '100%' }}
                options={Object.values(Role).map((role) => ({
                  value: role,
                  label: role,
                }))}
                value={filter?.role?.is || ''}
                onChange={(value) => dispatch(updateFilter({ role: { is: value }, shouldFetch: true }))}
              />
            </Col>
            <Col flex={'none'} style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                type="link"
                size="small"
                disabled={!filter?.role?.is}
                onClick={(evt) => {
                  dispatch(updateFilter({ role: {}, shouldFetch: true }));
                }}
              >
                Сбросить
              </Button>
            </Col>
          </Row>
        );
      },
      filterMultiple: false,
    },
  ];

  return userColumns;
};
