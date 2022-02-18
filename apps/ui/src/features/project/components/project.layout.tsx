import { Layout as AntLayout } from 'antd';
import { FC } from 'react';

import { ProjectHeader } from './project.header';

const { Content } = AntLayout;

export const ProjectLayout: FC = ({ children }) => {
    return (
        <AntLayout>
            <ProjectHeader />
            <Content>{children}</Content>
        </AntLayout>
    );
};
