import { useAppSelector } from '@/app/store';
import { UserFilterQuery } from '@/graphql';
import { FC } from 'react';
import { selectUsers } from '..';

export const HeaderRow: FC<any> = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>;
};

interface HeaderCellProps {
  dataIndex: keyof UserFilterQuery;
  [key: string]: any;
}

export const HeaderCell: FC<HeaderCellProps> = ({ children, style, dataIndex, ...props }) => {
  const { filter } = useAppSelector(selectUsers);
  const cellStyle = {
    ...style,
    ...(Object.keys(filter[dataIndex] || {}).length > 0
      ? { backgroundColor: 'rgba(190,245,255,0.9)' }
      : {}),
  };

  return (
    <th {...props} style={cellStyle}>
      {children}
    </th>
  );
};
