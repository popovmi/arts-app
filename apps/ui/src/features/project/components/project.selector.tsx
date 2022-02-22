import { Project, useLazyProjectsLovQuery } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { Divider, Select, Space, Typography } from 'antd';
import React, { FC } from 'react';

interface ProjectsSelectorProps {
  value?: string;
  onChange?: (value: any) => void;
  allowClear?: boolean;
  currentProject?: Project | undefined | null;
  disabled?: boolean;
  onClear?: () => void;
}

let timer: NodeJS.Timer;

export const ProjectsSelector: FC<ProjectsSelectorProps> = ({
  currentProject,
  disabled = false,
  onChange,
  onClear = () => {},
  ...props
}) => {
  const [fetch, { data, isLoading, isFetching }] = useLazyProjectsLovQuery();
  const projects = data?.projects.page.edges?.map((edge) => edge.node as Project) || [];
  const options = [...projects.map((project) => ({ label: project.name, value: project.id }))];

  const search = (val: string) => {
    const cb = () => fetch({ filter: { name: { contains: val } }, pagination: { first: 10 } });

    clearTimeout(timer);
    timer = setTimeout(cb, 800);
  };

  if (currentProject) {
    const index = options.findIndex((option) => option.value === currentProject.id);

    if (index >= 0) {
      options.splice(index, 1);
    }
    options.unshift({ label: currentProject.name, value: currentProject.id });
  }
  const loading = isLoading || isFetching;

  const DropDown = (orig: any) => {
    if (loading) return <CenteredSpin spinning tip="Поиск" />;

    return (
      <Space
        direction="vertical"
        split={<Divider style={{ margin: 0 }} />}
        style={{ width: '100%', padding: 8 }}
      >
        <Typography.Text strong style={{ fontSize: '0.70REM' }}>
          Вводите название проекта
        </Typography.Text>
        {orig}
      </Space>
    );
  };

  return (
    <Select
      {...props}
      style={{ minWidth: 100, width: '100%', maxWidth: 300 }}
      options={options}
      showSearch={true}
      loading={loading}
      onChange={onChange}
      onSearch={search}
      filterOption={false}
      dropdownRender={DropDown}
      placeholder="Проект"
      onClear={onClear}
      onClick={() => {
        if (projects.length === 0) fetch({ pagination: { first: 10 } });
      }}
      disabled={disabled}
    ></Select>
  );
};
