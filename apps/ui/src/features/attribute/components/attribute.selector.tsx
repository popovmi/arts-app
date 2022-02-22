import { AttributeType, useLazyAttributesQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
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
  value?: string;
  onChange?: (value: any) => void;
  allowClear?: boolean;
  mode?: undefined;
  onClear?: () => void;
}
type AttributeSelectorProps = MultipleAttributeSelectorProps | SingleAttributeSelectorProps;

export const AttributeSelector: FC<AttributeSelectorProps> = ({
  type,
  active,
  value,
  onChange,
  allowClear = false,
  mode,
  onClear = () => {},
}) => {
  const [load, { data, isLoading, isFetching }] = useLazyAttributesQuery({});
  const loading = isLoading || isFetching;
  const options = (data?.attributes || [])
    .filter((type) => (active === true ? type.active : true))
    .map(({ name }) => ({ value: name, label: name }));

  const onSelectChange = (newValue: string | string[]) => {
    onChange!(newValue);
  };

  return (
    <Select
      style={{ minWidth: 100, width: '100%', maxWidth: 300 }}
      showSearch
      options={options}
      value={value}
      allowClear={allowClear}
      onChange={onSelectChange}
      loading={loading}
      mode={mode}
      dropdownRender={(orig) => (loading ? <CenteredSpin /> : orig)}
      onClear={onClear}
      onClick={() => {
        if (!options.length) load({ type });
      }}
    />
  );
};
