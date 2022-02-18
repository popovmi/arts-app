import { Layout as AntLayout } from 'antd';
import { FC } from 'react';

import { ArtHeader } from './art.header';

const { Content } = AntLayout;

export const ArtLayout: FC = ({ children }) => {
    return (
        <AntLayout>
            <ArtHeader />
            <Content style={{ padding: 8 }}>{children}</Content>
        </AntLayout>
    );
};
