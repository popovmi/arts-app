import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ArtLayout } from '../components';

export const ArtsPage: FC = () => {
    return (
        <ArtLayout>
            <Outlet />
        </ArtLayout>
    );
};
