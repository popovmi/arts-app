import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ProjectLayout } from '../components/project.layout';

export const ProjectsPage: FC = () => {
  return (
    <ProjectLayout>
      <Outlet />
    </ProjectLayout>
  );
};
