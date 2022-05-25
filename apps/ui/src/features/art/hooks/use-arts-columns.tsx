import { useAppDispatch, useAppSelector } from '@/app/store';
import { AttributeSelector, AttributesLabels } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { projectAttributesTypes } from '@/features/project/project-attribute.types';
import { Art, ArtFilterQuery, AttributeType, ProjectFilterQuery, StringFieldOption } from '@/graphql';
import { ExpandOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    Radio,
    RadioChangeEvent,
    Row,
    Space,
    TableColumnGroupType,
    TableColumnType,
    Tooltip,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC, HTMLAttributes, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectArts, shouldFetch, updateFilter } from '..';
import { artAttributesTypes } from '../art-attribute.types';
import { setPreview } from '../art.slice';

interface ArtFilterItemProps {
    value: any;
    onChange: (value: any) => void;
    onClear: () => void;
    disableClear: boolean;
    withTimer: boolean;
}

type ArtTableColumnType = TableColumnType<Art> | TableColumnGroupType<Art>;

function arraysEqual(a: any[], b: any[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

const ArtFilterInput: FC<ArtFilterItemProps> = ({ onChange, value, onClear, disableClear, withTimer }) => {
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

export const useArtColumns = (): ArtTableColumnType[] => {
    const dispatch = useAppDispatch();
    const { filter, showDataIndexes } = useAppSelector(selectArts);

    const buildFilterObject = (dataIndex: string | string[], value: any) => {
        let filterField: any = {};

        if (Array.isArray(dataIndex)) {
            for (let i = dataIndex.length - 1; i >= 0; i--) {
                if (i === dataIndex.length - 1) filterField = { [dataIndex[i]]: value };
                else filterField = { [dataIndex[i]]: { ...filterField } };
            }
        } else {
            Object.assign(filterField, { [dataIndex]: value });
        }

        return filterField;
    };

    const getAttributeFilter = (type: AttributeType, dataIndex: any) => () => {
        const onChange = (value: string[]) => {
            const filterValue = value?.length > 0 ? { in: value } : {};

            dispatch(
                updateFilter({
                    ...buildFilterObject(dataIndex, filterValue),
                    shouldFetch: true,
                })
            );
        };

        const filterProp = Array.isArray(dataIndex)
            ? dataIndex.reduce((ff, idxPart) => ff[idxPart] || {}, filter)
            : filter[dataIndex as keyof ArtFilterQuery];

        return (
            <Space direction="horizontal" style={{ padding: 8 }} align="end">
                <AttributeSelector
                    type={type}
                    value={(filterProp as StringFieldOption)?.in || []}
                    allowClear
                    mode="multiple"
                    onChange={onChange}
                    onClear={() =>
                        dispatch(
                            updateFilter({
                                ...buildFilterObject(dataIndex, {}),
                                shouldFetch: true,
                            })
                        )
                    }
                />
            </Space>
        );
    };

    const getYesNoFilter = (dataIndex: any) => () => {
        const onChange = (e: RadioChangeEvent) => {
            const value = typeof e.target.value === 'boolean' ? { is: e.target.value } : {};

            dispatch(
                updateFilter({
                    ...buildFilterObject(dataIndex, value),
                    shouldFetch: true,
                })
            );
        };

        const filterProp = Array.isArray(dataIndex)
            ? dataIndex.reduce((ff, idxPart) => ff[idxPart] || {}, filter)
            : filter[dataIndex as keyof ArtFilterQuery];

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
                            dispatch(
                                updateFilter({
                                    ...buildFilterObject(dataIndex, {}),
                                    shouldFetch: true,
                                })
                            );
                        }}
                    >
                        Сбросить
                    </Button>
                </Col>
            </Row>
        );
    };

    const artColumns: ArtTableColumnType[] = [
        {
            onHeaderCell: (record) => ({ dataIndex: 'name' } as HTMLAttributes<any>),
            dataIndex: 'name',
            title: 'Чертеж(ревизия)',
            filteredValue: filter?.name?.contains ? [filter.name.contains] : [],
            filterDropdown: () => (
                <ArtFilterInput
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
            render: (_, record) => (
                <Row gutter={[4, 4]} justify={'space-between'} wrap={false}>
                    <Col
                        flex={1}
                        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                    >
                        <Tooltip title={record.name}>
                            <Link to={`/arts/${record.id}`}>{record.name}</Link>
                        </Tooltip>
                    </Col>
                    <Col flex={'none'}>
                        <ExpandOutlined
                            onClick={() => dispatch(setPreview({ artId: record.id, visible: true }))}
                        />
                    </Col>
                </Row>
                // <Space>
                //     {record.files && record.files?.length > 0 && (
                //         <Image
                //             src={`/static/${record.files![0].watermarkPath}`}
                //             style={{ maxWidth: 60, maxHeight: 80 }}
                //         />
                //     )}
                // </Space>
            ),
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

        ...(artAttributesTypes.map((type: any) => ({
            dataIndex: `${type}`,
            title: AttributesLabels[type as AttributeType],
            onHeaderCell: (record: Art) => ({ dataIndex: `${type}` } as HTMLAttributes<any>),
            filteredValue:
                Object.keys(filter[type as keyof ArtFilterQuery] || {}).length > 0
                    ? (filter[type as keyof ArtFilterQuery] as StringFieldOption)!.in
                    : [],
            filterDropdown: getAttributeFilter(type, type),
        })) as any[]),

        {
            title: 'Проект',
            key: 'project',
            align: 'left',
            children: [
                {
                    dataIndex: ['project', 'name'],
                    title: 'Название',
                    render: (_, record) =>
                        record.project && (
                            <Link to={`/projects/${record.project.id}`}>{record.project.name}</Link>
                        ),
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'name'] } as HTMLAttributes<any>),
                    filteredValue: filter?.project?.name?.contains ? [filter.project?.name.contains] : [],
                    filterDropdown: () => (
                        <ArtFilterInput
                            disableClear={!filter.project?.name?.contains}
                            onClear={() =>
                                dispatch(updateFilter({ project: { name: {} }, shouldFetch: true }))
                            }
                            onChange={(value) =>
                                dispatch(
                                    updateFilter({
                                        project: { name: value ? { contains: value } : {} },
                                        shouldFetch: false,
                                    })
                                )
                            }
                            value={filter?.project?.name?.contains || ''}
                            withTimer={true}
                        />
                    ),
                    filterMultiple: false,
                },

                {
                    dataIndex: ['project', 'internal'],
                    title: 'Внутренний',
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'internal'] } as HTMLAttributes<any>),
                    filteredValue:
                        typeof filter.project?.internal?.is === 'boolean'
                            ? [filter.project?.internal.is]
                            : [],
                    filterDropdown: getYesNoFilter(['project', 'internal']),
                    filterMultiple: false,
                    render: (_, { project }) =>
                        typeof project?.internal === 'boolean' ? (project.internal ? 'Да' : 'Нет') : '',
                },

                {
                    dataIndex: ['project', 'hasDesignDoc'],
                    title: 'Есть КД',
                    onHeaderCell: (record) =>
                        ({ dataIndex: ['project', 'hasDesignDoc'] } as HTMLAttributes<any>),
                    filteredValue:
                        typeof filter.project?.hasDesignDoc?.is === 'boolean'
                            ? [filter.project?.hasDesignDoc.is]
                            : [],
                    filterDropdown: getYesNoFilter(['project', 'hasDesignDoc']),
                    filterMultiple: false,
                    render: (_, { project }) =>
                        typeof project?.hasDesignDoc === 'boolean'
                            ? project.hasDesignDoc
                                ? 'Да'
                                : 'Нет'
                            : '',
                },

                ...(projectAttributesTypes.map((type: any) => ({
                    dataIndex: ['project', `${type}`],
                    title: AttributesLabels[type as AttributeType],
                    onHeaderCell: (record: Art) =>
                        ({ dataIndex: ['project', `${type}`] } as HTMLAttributes<any>),
                    filteredValue:
                        Object.keys(filter.project?.[type as keyof ProjectFilterQuery] || {}).length > 0
                            ? (filter.project?.[type as keyof ProjectFilterQuery] as StringFieldOption)!.in
                            : [],
                    filterDropdown: getAttributeFilter(type, ['project', type]),
                })) as any[]),

                {
                    dataIndex: ['project', 'customer', 'id'],
                    title: 'Заказчик',
                    onHeaderCell: (record) =>
                        ({ dataIndex: ['project', 'customerId'] } as HTMLAttributes<any>),
                    render: (_, record) => record.project?.customer?.name,
                    filteredValue:
                        Object.keys(filter.project?.customerId || {}).length > 0
                            ? filter.project?.customerId!.in
                            : [],
                    filterDropdown: () => {
                        const onChange = (value: string[]) => {
                            dispatch(
                                updateFilter({
                                    project: {
                                        customerId: value?.length > 0 ? { in: value } : {},
                                    },
                                    shouldFetch: true,
                                })
                            );
                        };

                        return (
                            <Space direction="horizontal" style={{ padding: 8 }} align="end">
                                <CustomerSelector
                                    value={(filter.project?.customerId as StringFieldOption)?.in || []}
                                    allowClear
                                    mode="multiple"
                                    onChange={onChange}
                                    onClear={() =>
                                        dispatch(
                                            updateFilter({
                                                project: { customerId: {} },
                                                shouldFetch: true,
                                            })
                                        )
                                    }
                                />
                            </Space>
                        );
                    },
                },
                {
                    dataIndex: ['project', 'factory', 'id'],
                    title: 'Завод',
                    onHeaderCell: (record) =>
                        ({ dataIndex: ['project', 'factoryId'] } as HTMLAttributes<any>),
                    render: (_, record) => record.project?.factory?.name,
                    filteredValue:
                        Object.keys(filter.project?.factoryId || {}).length > 0
                            ? filter.project?.factoryId!.in
                            : [],
                    filterDropdown: () => {
                        const onChange = (value: string[]) => {
                            dispatch(
                                updateFilter({
                                    project: {
                                        factoryId: value?.length > 0 ? { in: value } : {},
                                    },
                                    shouldFetch: true,
                                })
                            );
                        };

                        return (
                            <Space direction="horizontal" style={{ padding: 8 }} align="end">
                                <FactorySelector
                                    value={(filter.project?.factoryId as StringFieldOption)?.in || []}
                                    allowClear
                                    mode="multiple"
                                    onChange={onChange}
                                    onClear={() =>
                                        dispatch(
                                            updateFilter({
                                                project: { factoryId: {} },
                                                shouldFetch: true,
                                            })
                                        )
                                    }
                                />
                            </Space>
                        );
                    },
                },
            ],
        },
    ];

    return filterColumns(artColumns, showDataIndexes);
};

const filterColumns = (
    columns: ArtTableColumnType[],
    showDataIndexes: Array<string | string[]>
): ArtTableColumnType[] => {
    return columns.filter((_column: TableColumnType<Art>) => {
        if (_column.dataIndex) {
            if (typeof _column.dataIndex === 'string') {
                return showDataIndexes.includes(_column.dataIndex);
            }

            if (Array.isArray(_column.dataIndex)) {
                return !!showDataIndexes.find((showIndex) => {
                    if (Array.isArray(showIndex)) {
                        return arraysEqual(showIndex, _column.dataIndex as string[]);
                    } else return (_column.dataIndex as string[])[0] === showIndex;
                });
            }
        }

        const artColumn = _column as TableColumnGroupType<Art>;

        if (artColumn.children) {
            artColumn.children = filterColumns(artColumn.children, showDataIndexes);
        }

        return !!artColumn.children.length;
    });
};
