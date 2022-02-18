import { useAppDispatch, useAppSelector } from '@/app/store';
import { AttributeSelector } from '@/features/attribute';
import { Art, ArtFilterQuery, AttributeType, BooleanFieldOption, StringFieldOption } from '@/graphql';
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

    const getAttributeFilter = (type: AttributeType, dataIndex: keyof ArtFilterQuery) => () => {
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

    const getYesNoFilter = (dataIndex: keyof ArtFilterQuery) => () => {
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
                    title: 'Внутренний',
                    dataIndex: ['project', 'internal'],
                    render: (_, record) => (record.project && record.project.internal ? 'Да' : 'Нет'),
                },
                {
                    title: 'Есть КД',
                    dataIndex: ['project', 'hasDesignDoc'],
                    render: (_, record) => (record.project && record.project.internal ? 'Да' : 'Нет'),
                },
                {
                    title: 'Кол-во капель',
                    dataIndex: ['project', 'dropNumber'],
                },
                {
                    title: 'Межцентровое',
                    dataIndex: ['project', 'intercenter'],
                },
                {
                    title: 'СФМ',
                    dataIndex: ['project', 'sfm'],
                },
                {
                    title: 'Заказчик',
                    dataIndex: ['project', 'customer', 'id'],
                    render: (_, record) => record.project?.customer?.name,
                },
                {
                    title: 'Завод',
                    dataIndex: ['project', 'factory', 'id'],
                    render: (_, record) => record.project?.factory?.name,
                },
                {
                    dataIndex: ['project', 'id'],
                    title: 'Название',
                    render: (_, record) =>
                        record.project && <Link to={`/projects/${record.project.id}`}>{record.project.name}</Link>,
                },
            ],
        },
    ];

    return artColumns;
};
