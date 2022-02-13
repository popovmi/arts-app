import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthGuard } from 'modules/auth/auth.guard';
import { ProjectType, CreateProjectInput } from './dto';
import { FindProjectArgs } from './dto/find-projects.args';
import { ProjectResponse } from './dto/projects.response';
import { ProjectService } from './project.service';

@Resolver(() => ProjectType)
@UseGuards(AuthGuard)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => ProjectType)
  async project(@Args('id') id: string) {
    return this.projectService.getProject(id);
  }

  @Query(() => ProjectResponse)
  async projects(@Args() args: FindProjectArgs) {
    return await this.projectService.getProjects(args);
  }

  @Mutation(() => ProjectType)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectService.createProject(createProjectInput);
  }
}
