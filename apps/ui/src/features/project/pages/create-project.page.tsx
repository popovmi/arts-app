import { useCreateProjectMutation } from '@/graphql';
import { Button, PageHeader, Result, Space, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateProjectForm } from '../components';

export const CreateProjectPage: FC = () => {
    const navigate = useNavigate();

    const { isSuccess, data, reset } = useCreateProjectMutation({
        fixedCacheKey: 'createProject',
    })[1];

    useEffect(() => {
        return () => reset();
    }, []);

    return (
        <>
            <PageHeader
                title={
                    <Typography.Title level={1} style={{ margin: 0 }}>
                        Новый проект
                    </Typography.Title>
                }
                onBack={() => navigate(-1)}
            />
            {isSuccess ? (
                <Result title={`Проект ${data?.createProject.name} создан`} status={'success'}>
                    <Space>
                        <Button onClick={() => reset()}>Создать еще</Button>
                        <Link to={`/projects/${data?.createProject.id}`}>Перейти к проекту</Link>
                    </Space>
                </Result>
            ) : (
                <CreateProjectForm />
            )}
        </>
    );
};
