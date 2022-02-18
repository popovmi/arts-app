import { useCustomersQuery } from '@/graphql';
import { Select } from 'antd';
import { FC } from 'react';

interface MultipleCustomerSelectorProps {
    active?: boolean;
    value: string[];
    onChange: (value: any) => void;
    allowClear?: boolean;
    mode: 'multiple';
    onClear: () => void;
}

interface SingleCustomerSelectorProps {
    active?: boolean;
    value: string;
    onChange: (value: any) => void;
    allowClear?: boolean;
    mode?: undefined;
    onClear: () => void;
}
type CustomerSelectorProps = MultipleCustomerSelectorProps | SingleCustomerSelectorProps;

export const CustomerSelector: FC<CustomerSelectorProps> = ({
    active,
    value,
    onChange,
    allowClear,
    mode,
    onClear,
}) => {
    const { data, isLoading, isFetching } = useCustomersQuery();
    const loading = isLoading || isFetching;
    const options = (data?.customers || [])
        .filter((customer) => (active === true ? customer.active : true))
        .map(({ id, name }) => ({ value: id, label: name }));

    const onSelectChange = (newValue: string | string[]) => {
        onChange(newValue);
    };

    return (
        <Select
            style={{ width: 250 }}
            showSearch
            options={options}
            value={value}
			filterOption={(val, opt) => opt!.label.toLowerCase().indexOf(val.toLowerCase()) > -1}
            allowClear={allowClear}
            onChange={onSelectChange}
            loading={loading}
            mode={mode}
            onClear={onClear}
        />
    );
};
