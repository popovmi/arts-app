import { useAppSelector } from '@/app/store';
import { ArtFilterQuery } from '@/graphql';
import { FC } from 'react';
import { selectArts } from '..';

export const HeaderRow: FC<any> = ({ children, ...props }) => {
    return <tr {...props}>{children}</tr>;
};

interface HeaderCellProps {
    dataIndex: keyof ArtFilterQuery;
    [key: string]: any;
}

export const HeaderCell: FC<HeaderCellProps> = ({ children, style, dataIndex, ...props }) => {
    const { filter } = useAppSelector(selectArts);
    const filterField = Array.isArray(dataIndex)
        ? dataIndex.reduce((ff, idxPart) => ff[idxPart] || {}, filter)
        : filter[dataIndex];

    const cellStyle = {
        ...style,
        ...(Object.keys(filterField || {}).length > 0 ? { backgroundColor: 'rgba(190,245,255,0.9)' } : {}),
    };

    return (
        <th {...props} style={cellStyle}>
            {children}
        </th>
    );
};

interface TableBodyProps {
    [key: string]: any;
}

export const TableBody: FC<TableBodyProps> = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;
