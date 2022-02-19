import { useAppDispatch, useAppSelector } from '@/app/store';
import { setShowColumns } from '..';
import { TreeSelect } from 'antd';
import { FC } from 'react';

const treeData = [
    {
        title: 'Название',
        value: 'name',
    },
    {
        title: 'Внутренний',
        value: 'internal',
    },
    {
        title: 'Класс',
        value: 'artClass',
    },
    {
        title: 'Форма дна',
        value: 'bottomForm',
    },
    {
        title: 'Форма',
        value: 'form',
    },
    {
        title: 'Высота',
        value: 'height',
    },
    {
        title: 'Номинальный объем',
        value: 'nominalVolume',
    },
    {
        title: 'Метод производства',
        value: 'productionMethod',
    },
    {
        title: 'Вид продукта',
        value: 'productType',
    },
    {
        title: 'Тип венчика',
        value: 'ringType',
    },
    {
        title: 'Проект',
        value: 'project',
        children: [
            {
                title: 'Проект: Название',
                value: 'project.name',
            },
            {
                title: 'Проект: Внутренний',
                value: 'project.internal',
            },
            {
                title: 'Есть КД',
                value: 'project.hasDesignDoc',
            },
            {
                title: 'Количество капель',
                value: 'project.dropNumber',
            },
            {
                title: 'Межцентровое',
                value: 'project.intercenter',
            },
            {
                title: 'СФМ',
                value: 'project.sfm',
            },
            {
                title: 'Заказчк',
                value: 'project.factory.id',
            },
            {
                title: 'Завод',
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
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="Please select"
            treeCheckable={true}
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            value={showColumns}
            multiple
            onChange={(values) => dispatch(setShowColumns(values))}
        />
    );
};
