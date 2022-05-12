import { useAppDispatch, useAppSelector } from '@/app/store';
import { AttributeSelector } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { AttributeType, BooleanFieldOption, Project, ProjectFilterQuery, StringFieldOption } from '@/graphql';
import { Button, Col, Input, Radio, RadioChangeEvent, Row, Space, TableColumnProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC, HTMLAttributes, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectProjects, shouldFetch, updateFilter } from '..';

interface ProjectFilterItemProps {
    value: any;
    onChange: (value: any) => void;
    onClear: () => void;
    disableClear: boolean;
    withTimer: boolean;
}

const ProjectFilterInput: FC<ProjectFilterItemProps> = ({
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

export const projectColumns = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(selectProjects);

    const getAttributeFilter = (type: AttributeType, dataIndex: keyof ProjectFilterQuery) => () => {
        const onChange = (value: string[]) => {
            dispatch(
                updateFilter({
                    [dataIndex]: value?.length > 0 ? { in: value } : {},
                    shouldFetch: true,
                })
            );
        };

        return (
            <Space direction="horizontal" style={{ padding: 8 }} align="end">
                <AttributeSelector
                    type={type}
                    value={(filter[dataIndex] as StringFieldOption)?.in || []}
                    allowClear
                    mode="multiple"
                    onChange={onChange}
                    onClear={() => dispatch(updateFilter({ [dataIndex]: {}, shouldFetch: true }))}
                />
            </Space>
        );
    };

    const getYesNoFilter = (dataIndex: keyof ProjectFilterQuery) => () => {
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

    const projectColumns: TableColumnProps<Project>[] = [
        {
            onHeaderCell: (record) => ({ dataIndex: 'name' } as HTMLAttributes<any>),
            dataIndex: 'name',
            title: 'Название',
            filteredValue: filter?.name?.contains ? [filter.name.contains] : [],
            filterDropdown: () => (
                <ProjectFilterInput
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
            render: (_, record) => <Link to={`/projects/${record.id}`} target='_blank'>{record.name}</Link>,
        },
        {
            dataIndex: 'internal',
            title: 'Внутренний',
            onHeaderCell: (record) => ({ dataIndex: 'internal' } as HTMLAttributes<any>),
            filteredValue: typeof filter.internal?.is === 'boolean' ? [filter.internal.is] : [],
            filterDropdown: getYesNoFilter('internal'),
            filterMultiple: false,
            render: (_, { internal }) => (internal ? 'Да' : 'Нет'),
        },
        {
            dataIndex: 'hasDesignDoc',
            title: 'Есть КД',
            onHeaderCell: (record) => ({ dataIndex: 'hasDesignDoc' } as HTMLAttributes<any>),
            filteredValue: typeof filter.hasDesignDoc?.is === 'boolean' ? [filter.hasDesignDoc.is] : [],
            filterDropdown: getYesNoFilter('hasDesignDoc'),
            filterMultiple: false,
            render: (_, { hasDesignDoc }) => (hasDesignDoc ? 'Да' : 'Нет'),
        },
        {
            dataIndex: 'dropNumber',
            title: 'Кол-во капель',
            onHeaderCell: (record) => ({ dataIndex: 'dropNumber' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.dropNumber || {}).length > 0 ? filter.dropNumber!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.DropNumber, 'dropNumber'),
        },
        {
            dataIndex: 'intercenter',
            title: 'Межцентровое',
            onHeaderCell: (record) => ({ dataIndex: 'intercenter' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.intercenter || {}).length > 0 ? filter.intercenter!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.Intercenter, 'intercenter'),
        },
        {
            dataIndex: 'sfm',
            title: 'СФМ',
            onHeaderCell: (record) => ({ dataIndex: 'sfm' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.sfm || {}).length > 0 ? filter.sfm!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.Sfm, 'sfm'),
        },
        {
            dataIndex: ['customer', 'id'],
            title: 'Заказчик',
            onHeaderCell: (record) => ({ dataIndex: 'customerId' } as HTMLAttributes<any>),
            render: (_, record) => record.customer?.name,
            filteredValue: Object.keys(filter.customerId || {}).length > 0 ? filter.customerId!.in : [],
            filterDropdown: () => {
                const onChange = (value: string[]) => {
                    dispatch(
                        updateFilter({
                            customerId: value?.length > 0 ? { in: value } : {},
                            shouldFetch: true,
                        })
                    );
                };

                return (
                    <Space direction="horizontal" style={{ padding: 8 }} align="end">
                        <CustomerSelector
                            value={(filter.customerId as StringFieldOption)?.in || []}
                            allowClear
                            mode="multiple"
                            onChange={onChange}
                            onClear={() => dispatch(updateFilter({ customerId: {}, shouldFetch: true }))}
                        />
                    </Space>
                );
            },
        },
        {
            dataIndex: ['factory', 'id'],
            title: 'Завод',
            onHeaderCell: (record) => ({ dataIndex: 'factoryId' } as HTMLAttributes<any>),
            render: (_, record) => record.factory?.name,
            filteredValue: Object.keys(filter.factoryId || {}).length > 0 ? filter.factoryId!.in : [],
            filterDropdown: () => {
                const onChange = (value: string[]) => {
                    dispatch(
                        updateFilter({
                            factoryId: value?.length > 0 ? { in: value } : {},
                            shouldFetch: true,
                        })
                    );
                };

                return (
                    <Space direction="horizontal" style={{ padding: 8 }} align="end">
                        <FactorySelector
                            value={(filter.factoryId as StringFieldOption)?.in || []}
                            allowClear
                            mode="multiple"
                            onChange={onChange}
                            onClear={() => dispatch(updateFilter({ factoryId: {}, shouldFetch: true }))}
                        />
                    </Space>
                );
            },
        },
    ];

    return projectColumns;
};
