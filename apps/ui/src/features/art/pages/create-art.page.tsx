import { useCreateManyArtsMutation } from '@/graphql';
import { Button, PageHeader, Result, Space, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateArtForm } from '../components';

export const CreateArtPage: FC = () => {
    const navigate = useNavigate();

    const [_, { isSuccess, data, reset }] = useCreateManyArtsMutation({
        fixedCacheKey: 'createArts',
    });

    useEffect(() => {
        return () => reset();
    }, []);

    return (
        <>
            <PageHeader
                title={
                    <Typography.Title level={1} style={{ margin: 0 }}>
                        Создание ART-а(ов)
                    </Typography.Title>
                }
                onBack={() => navigate(-1)}
            />
            {isSuccess ? (
                <Result title="ART(ы) создан(ы)" status={'success'}>
                    <Space direction="vertical">
                        {data?.createManyArts.map((createArt) => (
                            <Link key={createArt.id} to={`/arts/${createArt.id}`}>
                                {createArt.name}
                            </Link>
                        ))}
                        <Button onClick={() => reset()}>Создать еще</Button>
                    </Space>
                </Result>
            ) : (
                <CreateArtForm />
            )}
        </>
    );
};
