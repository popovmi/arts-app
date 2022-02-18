import { AttributeType, useAttributesQuery } from '@/graphql';
import { Select } from 'antd';
import { FC } from 'react';

interface MultipleAttributeSelectorProps {
    type: AttributeType;
    active?: boolean;
    value: string[];
    onChange: (value: any) => void;
    allowClear?: boolean;
    mode: 'multiple';
    onClear: () => void;
}

interface SingleAttributeSelectorProps {
    type: AttributeType;
    active?: boolean;
    value: string;
    onChange: (value: any) => void;
    allowClear?: boolean;
    mode?: undefined;
    onClear: () => void;
}
type AttributeSelectorProps = MultipleAttributeSelectorProps | SingleAttributeSelectorProps;

export const AttributeSelector: FC<AttributeSelectorProps> = ({
    type,
    active,
    value,
    onChange,
    allowClear,
    mode,
    onClear,
}) => {
    const { data, isLoading, isFetching } = useAttributesQuery({ type });
    const loading = isLoading || isFetching;
    const options = (data?.attributes || [])
        .filter((type) => (active === true ? type.active : true))
        .map(({ name }) => ({ value: name, label: name }));

    const onSelectChange = (newValue: string | string[]) => {
        onChange(newValue);
    };

    return (
        <Select
            style={{ width: 250 }}
			showSearch
            options={options}
            value={value}
			allowClear={allowClear}
            onChange={onSelectChange}
            loading={loading}
            mode={mode}
            onClear={onClear}
        />
    );
};
