import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const ArtPage: FC = () => {
    const { artId } = useParams();

    return <div>art {artId}</div>;
};
