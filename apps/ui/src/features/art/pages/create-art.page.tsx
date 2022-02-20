import { useCreateArtMutation } from '@/graphql';
import { Button, PageHeader, Result, Space } from 'antd';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateArtForm } from '../components';

export const CreateArtPage: FC = () => {
    const navigate = useNavigate();

    const [_, { isSuccess, data, reset }] = useCreateArtMutation({ fixedCacheKey: 'createArt' });

    useEffect(() => {
        return () => reset();
    }, []);

    return (
        <>
            <PageHeader title="Новый ART" onBack={() => navigate(-1)} />
            {isSuccess ? (
                <Result title="ART создан" status={'success'}>
                    <Space>
                        <Button onClick={() => reset()}>Создать еще</Button>
                        <Link to={`/arts/${data?.createArt.id}`}>Перейти к ART-у</Link>
                    </Space>
                </Result>
            ) : (
                <CreateArtForm />
            )}
        </>
    );
};
