import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ProjectService } from '@/modules/project/project.service';
import { ArtService } from '../services/art.service';

@Injectable({ scope: Scope.REQUEST })
export class ArtLoader {
  constructor(private projectService: ProjectService, private artService: ArtService) {}

  public readonly batchProjects = new DataLoader(async (projectIds: string[]) => {
    const users = await this.projectService.getByIds(projectIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return projectIds.map((authorId) => usersMap.get(authorId));
  });

  public readonly batchArtsFiles = new DataLoader(async (artIds: string[]) => {
    const arts = await this.artService.loadArtsFiles(artIds);
    const artsMap = new Map(arts.map((art) => [art.id, art.files]));
    return artIds.map((artId) => artsMap.get(artId));
  });
}
