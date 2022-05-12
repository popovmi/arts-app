import { useAppDispatch, useAppSelector } from '@/app/store';
import { TreeSelect } from 'antd';
import { FC } from 'react';
import { setShowColumns } from '..';

const treeData = [
    {
        title: 'Название',
        label: 'Название',
        value: 'name',
    },
    {
        title: 'Внутренний',
        label: 'Внутренний',
        value: 'internal',
    },
    {
        title: 'Класс',
        label: 'Класс',
        value: 'artClass',
    },
    {
        title: 'Форма дна',
        label: 'Форма дна',
        value: 'bottomForm',
    },
    {
        title: 'Форма',
        label: 'Форма',
        value: 'form',
    },
    {
        title: 'Высота',
        label: 'Высота',
        value: 'height',
    },
    {
        title: 'Номинальный объем',
        label: 'Номинальный объем',
        value: 'nominalVolume',
    },
    {
        title: 'Метод производства',
        label: 'Метод производства',
        value: 'productionMethod',
    },
    {
        title: 'Вид продукта',
        label: 'Вид продукта',
        value: 'productType',
    },
    {
        title: 'Тип венчика',
        label: 'Тип венчика',
        value: 'ringType',
    },
    {
        title: 'Проект',
        label: 'Проект',
        value: 'project',
        children: [
            {
                title: 'Проект: Название',
                label: 'Название',
                value: 'project.name',
            },
            {
                title: 'Проект: Внутренний',
                label: 'Внутренний',
                value: 'project.internal',
            },
            {
                title: 'Есть КД',
                label: 'Есть КД',
                value: 'project.hasDesignDoc',
            },
            {
                title: 'Количество капель',
                label: 'Количество капель',
                value: 'project.dropNumber',
            },
            {
                title: 'Межцентровое',
                label: 'Межцентровое',
                value: 'project.intercenter',
            },
            {
                title: 'СФМ',
                label: 'СФМ',
                value: 'project.sfm',
            },
            {
                title: 'Заказчк',
                label: 'Заказчк',
                value: 'project.factory.id',
            },
            {
                title: 'Завод',
                label: 'Завод',
                value: 'project.customer.id',
            },
        ],
    },
];

export const ArtColumnsMenu: FC = () => {
    const dispatch = useAppDispatch();
    const { showColumns } = useAppSelector((state) => state.art);

    return (
        <TreeSelect
            style={{ width: '100%' }}
			dropdownMatchSelectWidth={false}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 250 }}
            treeData={treeData}
            placeholder="Показать/скрыть столбцы"
            treeCheckable={true}
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            value={showColumns}
            filterTreeNode={(val, node) =>
                (node.label as string)!.toLowerCase().indexOf(val.toLowerCase()) > -1
            }
            multiple
            onChange={(values) => {
                if ((values || []).length > 0) dispatch(setShowColumns(values));
            }}
        />
    );
};
