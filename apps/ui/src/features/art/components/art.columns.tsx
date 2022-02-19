import { useAppDispatch, useAppSelector } from '@/app/store';
import { AttributeSelector } from '@/features/attribute';
import { CustomerSelector } from '@/features/customer';
import { FactorySelector } from '@/features/factory';
import { Art, ArtFilterQuery, AttributeType, StringFieldOption } from '@/graphql';
import {
	Button,
	Col,
	Input,
	Radio,
	RadioChangeEvent,
	Row,
	Space,
	TableColumnGroupType,
	TableColumnType
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC, HTMLAttributes, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectArts, shouldFetch, updateFilter } from '..';

interface ArtFilterItemProps {
    value: any;
    onChange: (value: any) => void;
    onClear: () => void;
    disableClear: boolean;
    withTimer: boolean;
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

export const artColumns = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(selectArts);

    const getAttributeFilter = (type: AttributeType, dataIndex: any) => () => {
        const onChange = (value: string[]) => {
            const filterValue = value?.length > 0 ? { in: value } : {};

            const filterField = Array.isArray(dataIndex)
                ? dataIndex.reduce((ff, idxPart, i, arr) => {
                      if (i === arr.length - 1) return { [idxPart]: filterValue };

                      return { [idxPart]: ff[idxPart] || {} };
                  }, filter)
                : { [dataIndex]: filterValue };

            dispatch(
                updateFilter({
                    ...filterField,
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
                    onClear={() => dispatch(updateFilter({ [dataIndex]: {}, shouldFetch: true }))}
                />
            </Space>
        );
    };

    const getYesNoFilter = (dataIndex: any) => () => {
        const onChange = (e: RadioChangeEvent) => {
            const value = typeof e.target.value === 'boolean' ? { is: e.target.value } : {};
            const filterField = Array.isArray(dataIndex)
                ? dataIndex.reduce((ff, idxPart, i, arr) => {
                      if (i === arr.length - 1) return { [idxPart]: value };

                      return { [idxPart]: ff[idxPart] || {} };
                  }, filter)
                : { [dataIndex]: value };

            dispatch(
                updateFilter({
                    ...filterField,
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
                            dispatch(updateFilter({ [dataIndex]: {}, shouldFetch: true }));
                        }}
                    >
                        Сбросить
                    </Button>
                </Col>
            </Row>
        );
    };

    const artColumns: Array<TableColumnType<Art> | TableColumnGroupType<Art>> = [
        {
            onHeaderCell: (record) => ({ dataIndex: 'name' } as HTMLAttributes<any>),
            dataIndex: 'name',
            fixed: true,
            title: 'Название',
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
            render: (_, record) => <Link to={`/projects/${record.id}`}>{record.name}</Link>,
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
            dataIndex: 'artClass',
            title: 'Класс',
            onHeaderCell: (record) => ({ dataIndex: 'artClass' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.artClass || {}).length > 0 ? filter.artClass!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.ArtClass, 'artClass'),
        },
        {
            dataIndex: 'bottomForm',
            title: 'Форма дна',
            onHeaderCell: (record) => ({ dataIndex: 'bottomForm' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.bottomForm || {}).length > 0 ? filter.bottomForm!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.BottomForm, 'bottomForm'),
        },
        {
            dataIndex: 'form',
            title: 'Форма',
            onHeaderCell: (record) => ({ dataIndex: 'form' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.form || {}).length > 0 ? filter.form!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.Form, 'form'),
        },
        {
            dataIndex: 'height',
            title: 'Высота',
            onHeaderCell: (record) => ({ dataIndex: 'height' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.height || {}).length > 0 ? filter.height!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.Height, 'height'),
        },
        {
            dataIndex: 'nominalVolume',
            title: 'Номинальный объем',
            onHeaderCell: (record) => ({ dataIndex: 'nominalVolume' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.nominalVolume || {}).length > 0 ? filter.nominalVolume!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.NominalVolume, 'nominalVolume'),
        },
        {
            dataIndex: 'productionMethod',
            title: 'Метод производства',
            onHeaderCell: (record) => ({ dataIndex: 'productionMethod' } as HTMLAttributes<any>),
            filteredValue:
                Object.keys(filter.productionMethod || {}).length > 0 ? filter.productionMethod!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.ProductionMethod, 'productionMethod'),
        },
        {
            dataIndex: 'productType',
            title: 'Вид продукта',
            onHeaderCell: (record) => ({ dataIndex: 'productType' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.productType || {}).length > 0 ? filter.productType!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.ProductType, 'productType'),
        },
        {
            dataIndex: 'ringType',
            title: 'Тип венчика',
            onHeaderCell: (record) => ({ dataIndex: 'ringType' } as HTMLAttributes<any>),
            filteredValue: Object.keys(filter.ringType || {}).length > 0 ? filter.ringType!.in : [],
            filterDropdown: getAttributeFilter(AttributeType.RingType, 'ringType'),
        },
        {
            title: 'Проект',
            children: [
                {
                    dataIndex: ['project', 'id'],
                    title: 'Название',
                    render: (_, record) =>
                        record.project && <Link to={`/projects/${record.project.id}`}>{record.project.name}</Link>,
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'name'] } as HTMLAttributes<any>),
                    filteredValue: filter?.project?.name?.contains ? [filter.project?.name.contains] : [],
                    filterDropdown: () => (
                        <ArtFilterInput
                            disableClear={!filter.project?.name?.contains}
                            onClear={() => dispatch(updateFilter({ project: { name: {} }, shouldFetch: true }))}
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
                        typeof filter.project?.internal?.is === 'boolean' ? [filter.project?.internal.is] : [],
                    filterDropdown: getYesNoFilter(['project', 'internal']),
                    filterMultiple: false,
                    render: (_, { project }) =>
                        typeof project?.internal === 'boolean' ? (project.internal ? 'Да' : 'Нет') : '',
                },
                {
                    dataIndex: ['project', 'hasDesignDoc'],
                    title: 'Есть КД',
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'hasDesignDoc'] } as HTMLAttributes<any>),
                    filteredValue:
                        typeof filter.project?.hasDesignDoc?.is === 'boolean'
                            ? [filter.project?.hasDesignDoc.is]
                            : [],
                    filterDropdown: getYesNoFilter('hasDesignDoc'),
                    filterMultiple: false,
                    render: (_, { project }) =>
                        typeof project?.hasDesignDoc === 'boolean' ? (project.internal ? 'Да' : 'Нет') : '',
                },
                {
                    dataIndex: ['project', 'dropNumber'],
                    title: 'Кол-во капель',
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'dropNumber'] } as HTMLAttributes<any>),
                    filteredValue:
                        Object.keys(filter.project?.dropNumber || {}).length > 0
                            ? filter.project?.dropNumber!.in
                            : [],
                    filterDropdown: getAttributeFilter(AttributeType.DropNumber, ['project', 'dropNumber']),
                },
                {
                    dataIndex: ['project', 'intercenter'],
                    title: 'Межцентровое',
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'intercenter'] } as HTMLAttributes<any>),
                    filteredValue:
                        Object.keys(filter.project?.intercenter || {}).length > 0
                            ? filter.project?.intercenter!.in
                            : [],
                    filterDropdown: getAttributeFilter(AttributeType.Intercenter, ['project', 'intercenter']),
                },
                {
                    dataIndex: ['project', 'sfm'],
                    title: 'СФМ',
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'sfm'] } as HTMLAttributes<any>),
                    filteredValue:
                        Object.keys(filter.project?.sfm || {}).length > 0 ? filter.project?.sfm!.in : [],
                    filterDropdown: getAttributeFilter(AttributeType.Sfm, ['project', 'sfm']),
                },
                {
                    dataIndex: ['customer', 'id'],
                    title: 'Заказчик',
                    onHeaderCell: (record) =>
                        ({ dataIndex: ['project', 'customer', 'id'] } as HTMLAttributes<any>),
                    render: (_, record) => record.project?.customer?.name,
                    filteredValue:
                        Object.keys(filter.project?.customerId || {}).length > 0
                            ? filter.project?.customerId!.in
                            : [],
                    filterDropdown: () => {
                        const onChange = (value: string[]) => {
                            dispatch(
                                updateFilter({
                                    project: { customerId: value?.length > 0 ? { in: value } : {} },
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
                                        dispatch(updateFilter({ project: { customerId: {} }, shouldFetch: true }))
                                    }
                                />
                            </Space>
                        );
                    },
                },
                {
                    dataIndex: ['factory', 'id'],
                    title: 'Завод',
                    onHeaderCell: (record) => ({ dataIndex: ['project', 'factory', 'id'] } as HTMLAttributes<any>),
                    render: (_, record) => record.project?.factory?.name,
                    filteredValue:
                        Object.keys(filter.project?.factoryId || {}).length > 0
                            ? filter.project?.factoryId!.in
                            : [],
                    filterDropdown: () => {
                        const onChange = (value: string[]) => {
                            dispatch(
                                updateFilter({
                                    project: { factoryId: value?.length > 0 ? { in: value } : {} },
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
                                        dispatch(updateFilter({ project: { factoryId: {} }, shouldFetch: true }))
                                    }
                                />
                            </Space>
                        );
                    },
                },
            ],
        },
    ];

    return artColumns;
};
