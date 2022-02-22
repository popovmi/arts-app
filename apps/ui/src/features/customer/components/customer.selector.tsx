import { useLazyCustomersQuery, Customer } from '@/graphql';
import { Select } from 'antd';
import { FC } from 'react';

interface MultipleCustomerSelectorProps {
  active?: boolean;
  value?: string[];
  onChange?: (value: any) => void;
  allowClear?: boolean;
  mode: 'multiple';
  onClear?: () => void;
  current?: Customer;
}

interface SingleCustomerSelectorProps {
  active?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  allowClear?: boolean;
  mode?: undefined;
  current?: Customer;
  onClear?: () => void;
}
type CustomerSelectorProps = MultipleCustomerSelectorProps | SingleCustomerSelectorProps;

export const CustomerSelector: FC<CustomerSelectorProps> = ({
  active,
  value,
  onChange,
  allowClear = false,
  mode,
  onClear = () => {},
  current,
}) => {
  const [fetch, { data, isLoading, isFetching }] = useLazyCustomersQuery({ refetchOnFocus: true });
  const loading = isLoading || isFetching;
  const options = (data?.customers || [])
    .filter((customer) => (active === true ? customer.active : true))
    .map(({ id, name }) => ({ value: id, label: name }));

  const onSelectChange = (newValue: string | string[]) => {
    onChange!(newValue);
  };

  if (current) {
    const index = options.findIndex((option) => option.value === current.id);

    if (index >= 0) {
      options.splice(index, 1);
    }
    options.unshift({ label: current.name, value: current.id });
  }

  return (
    <Select
      style={{ minWidth: 150, width: '100%', maxWidth: 300 }}
      showSearch
      options={options}
      value={value}
      filterOption={(val, opt) => opt!.label.toLowerCase().indexOf(val.toLowerCase()) > -1}
      allowClear={allowClear}
      onChange={onSelectChange}
      loading={loading}
      mode={mode}
      onClear={onClear}
      onClick={() => {
        if (!data?.customers?.length) fetch({});
      }}
    />
  );
};
