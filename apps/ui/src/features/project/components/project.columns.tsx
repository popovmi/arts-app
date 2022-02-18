import { useAppDispatch, useAppSelector } from '@/app/store';
import { Project } from '@/graphql';
import { Button, Col, Input, Row, TableColumnProps } from 'antd';
import { FC, HTMLAttributes, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectProjects, shouldFetch, updateFilter } from '..';

interface ProjectFilterItemProps {
    Component: typeof Input;
    value: any;
    onChange: (value: any) => void;
    onClear: () => void;
    disableClear: boolean;
    withTimer: boolean;
}

const ProjectFilterItem: FC<ProjectFilterItemProps> = ({
    Component,
    onChange,
    value,
    onClear,
    disableClear,
    withTimer,
}) => {
    let timer: NodeJS.Timeout;
    const dispatch = useAppDispatch();

    const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (withTimer) clearTimeout(timer);
        onChange(evt.target.value);
        if (withTimer) timer = setTimeout(() => dispatch(shouldFetch(true)), 800);
    };

    useEffect(() => {
        if (withTimer) return () => clearTimeout(timer);

        return;
    }, []);

    return (
        <Row gutter={[4, 4]} style={{ padding: 4, width: 200 }}>
            <Col xs={24}>
                <Component value={value || ''} onChange={onChangeValue} />
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

export const projectColumns = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(selectProjects);

    const projectColumns: TableColumnProps<Project>[] = [
        {
            onHeaderCell: (record) => ({ dataIndex: 'name' } as HTMLAttributes<any>),
            dataIndex: 'name',
            fixed: true,
            title: 'Название',
            filteredValue: filter?.name?.contains ? [filter.name.contains] : [],
            filterDropdown: () => (
                <ProjectFilterItem
                    Component={Input}
                    disableClear={!filter.name?.contains}
                    onClear={() => dispatch(updateFilter({ name: {}, shouldFetch: true }))}
                    onChange={(value) =>
                        dispatch(
                            updateFilter({
                                name: value ? { contains: value } : {},
                                shouldFetch: false,
                            })
                        )
                    }
                    value={filter?.name?.contains || ''}
                    withTimer={true}
                />
            ),
            filterMultiple: false,
            render: (_, record) => <Link to={`/projects/${record.id}`}>{record.name}</Link>,
        },
        {
            dataIndex: 'internal',
            title: 'Внутренний',
            onHeaderCell: (record) => ({ dataIndex: 'internal' } as HTMLAttributes<any>),
            filters: [
                { text: 'Да', value: true },
                { text: 'Нет', value: false },
            ],
            filterMultiple: false,
            render: (_, { internal }) => (internal ? 'Да' : 'Нет'),
        },
        {
            dataIndex: 'hasDesignDoc',
            title: 'Есть КД',
            onHeaderCell: (record) => ({ dataIndex: 'hasDesignDoc' } as HTMLAttributes<any>),
            filters: [
                { text: 'Да', value: true },
                { text: 'Нет', value: false },
            ],
            filterMultiple: false,
            render: (_, { hasDesignDoc }) => (hasDesignDoc ? 'Да' : 'Нет'),
        },
        {
            dataIndex: 'dropNumber',
            title: 'Кол-во капель',
            onHeaderCell: (record) => ({ dataIndex: 'dropNumber' } as HTMLAttributes<any>),
        },
        {
            dataIndex: 'intercenter',
            title: 'Межцентровое',
            onHeaderCell: (record) => ({ dataIndex: 'intercenter' } as HTMLAttributes<any>),
        },
        {
            dataIndex: 'sfm',
            title: 'СФМ',
            onHeaderCell: (record) => ({ dataIndex: 'sfm' } as HTMLAttributes<any>),
        },
        {
            dataIndex: ['factory', 'id'],
            title: 'Завод',
            onHeaderCell: (record) => ({ dataIndex: 'factoryId' } as HTMLAttributes<any>),
            render: (_, record) => record.customer?.name,
        },
        {
            dataIndex: ['customer', 'id'],
            title: 'Заказчик',
            onHeaderCell: (record) => ({ dataIndex: 'customerId' } as HTMLAttributes<any>),
            render: (_, record) => record.factory?.name,
        },
    ];

    return projectColumns;
};
