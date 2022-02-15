import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ArtService } from 'modules/art/services';
import { ProjectService } from 'modules/project/project.service';

@Injectable({ scope: Scope.REQUEST })
export class ProjectLoader {
    constructor(private projectService: ProjectService, private artService: ArtService) {}

    public readonly batchArts = new DataLoader(async (projectIds: string[]) => {
        const projects = await this.projectService.loadProjectsArts(projectIds);
        const projectsMap = new Map(projects.map((projects) => [projects.id, projects.arts]));
        return projectIds.map((projectId) => projectsMap.get(projectId));
    });
}
