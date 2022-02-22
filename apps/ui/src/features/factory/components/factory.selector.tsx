import { Factory, useLazyFactoriesQuery } from '@/graphql';
import { Select } from 'antd';
import { FC } from 'react';

interface MultipleFactorySelectorProps {
  active?: boolean;
  value?: string[];
  onChange?: (value: any) => void;
  allowClear?: boolean;
  mode: 'multiple';
  onClear?: () => void;
  current?: Factory;
}

interface SingleFactorySelectorProps {
  active?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  allowClear?: boolean;
  mode?: undefined;
  onClear?: () => void;
  current?: Factory;
}
type FactorySelectorProps = MultipleFactorySelectorProps | SingleFactorySelectorProps;

export const FactorySelector: FC<FactorySelectorProps> = ({
  active,
  value,
  onChange,
  allowClear = false,
  mode,
  onClear = () => {},
  current,
}) => {
  const [fetch, { data, isLoading, isFetching }] = useLazyFactoriesQuery();
  const loading = isLoading || isFetching;
  const options = (data?.factories || [])
    .filter((factory) => (active === true ? factory.active : true))
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
      filterOption={(val, opt) => opt!.label.toLowerCase().indexOf(val.toLowerCase()) > -1}
      showSearch
      options={options}
      value={value}
      allowClear={allowClear}
      onChange={onSelectChange}
      loading={loading}
      mode={mode}
      onClear={onClear}
      onClick={() => {
        if (!data?.factories?.length) fetch({});
      }}
    />
  );
};
