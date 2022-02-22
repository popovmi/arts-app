import { useAppSelector } from '@/app/store';
import { ProjectFilterQuery } from '@/graphql';
import { FC } from 'react';
import { selectProjects } from '..';

export const HeaderRow: FC = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>;
};

interface HeaderCellProps {
  dataIndex: keyof ProjectFilterQuery;
  [key: string]: any;
}

export const HeaderCell: FC<HeaderCellProps> = ({ children, style, dataIndex, ...props }) => {
  const { filter } = useAppSelector(selectProjects);
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
