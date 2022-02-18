import { useAppSelector } from '@/app/store';
import { ArtFilterQuery } from '@/graphql';
import { FC } from 'react';
import { selectArts } from '..';

export const HeaderRow: FC = ({ children, ...props }) => {
    return <tr {...props}>{children}</tr>;
};

interface HeaderCellProps {
    dataIndex: keyof ArtFilterQuery;
    [key: string]: any;
}

export const HeaderCell: FC<HeaderCellProps> = ({ children, style, dataIndex, ...props }) => {
    const { filter } = useAppSelector(selectArts);
    const cellStyle = {
        ...style,
        ...(Object.keys(filter[dataIndex] || {}).length > 0 ? { backgroundColor: 'rgba(190,245,255,0.9)' } : {}),
    };

    return (
        <th {...props} style={cellStyle}>
            {children}
        </th>
    );
};
