import { SwitcherOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { MouseEventHandler, FC } from 'react';

interface ActiveCellProps {
  record: { active: boolean };
  action: MouseEventHandler<HTMLElement>;
}

export const ActiveTableCell: FC<ActiveCellProps> = ({ record, action }) => (
  <Button
    size="small"
    type="primary"
    danger={!record.active}
    icon={<SwitcherOutlined />}
    onClick={action}
  >
    {record.active ? 'Активен' : 'Неактивен'}
  </Button>
);
