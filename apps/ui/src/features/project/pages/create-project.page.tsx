import { useCreateProjectMutation } from '@/graphql';
import { Button, PageHeader, Result, Space } from 'antd';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateArtForm } from '../components';

export const CreateProjectPage: FC = () => {
  const navigate = useNavigate();

  const [_, { isSuccess, data, reset }] = useCreateProjectMutation({
    fixedCacheKey: 'createProject',
  });

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <>
      <PageHeader title="Новый проект" onBack={() => navigate(-1)} />
      {isSuccess ? (
        <Result title="Проект создан" status={'success'}>
          <Space>
            <Button onClick={() => reset()}>Создать еще</Button>
            <Link to={`/projects/${data?.createProject.id}`}>Перейти к проекту</Link>
          </Space>
        </Result>
      ) : (
        <CreateArtForm />
      )}
    </>
  );
};
