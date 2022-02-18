import { useFactoriesQuery } from '@/graphql';
import { Select } from 'antd';
import { FC } from 'react';

interface MultipleFactorySelectorProps {
    active?: boolean;
    value: string[];
    onChange: (value: any) => void;
    allowClear?: boolean;
    mode: 'multiple';
    onClear: () => void;
}

interface SingleFactorySelectorProps {
    active?: boolean;
    value: string;
    onChange: (value: any) => void;
    allowClear?: boolean;
    mode?: undefined;
    onClear: () => void;
}
type FactorySelectorProps = MultipleFactorySelectorProps | SingleFactorySelectorProps;

export const FactorySelector: FC<FactorySelectorProps> = ({
    active,
    value,
    onChange,
    allowClear,
    mode,
    onClear,
}) => {
    const { data, isLoading, isFetching } = useFactoriesQuery();
    const loading = isLoading || isFetching;
    const options = (data?.factories || [])
        .filter((factory) => (active === true ? factory.active : true))
        .map(({ id, name }) => ({ value: id, label: name }));

    const onSelectChange = (newValue: string | string[]) => {
        onChange(newValue);
    };

    return (
        <Select
            style={{ width: 250 }}
			filterOption={(val, opt) => opt!.label.toLowerCase().indexOf(val.toLowerCase()) > -1}
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
