import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArtType } from 'modules/art/dto';
import { AuthGuard } from 'modules/auth/auth.guard';
import { CreateProjectInput, ProjectType } from './dto';
import { FindProjectArgs } from './dto/find-projects.args';
import { ProjectResponse } from './dto/projects.response';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectLoader } from './loaders';
import { ProjectService } from './project.service';

@Resolver(() => ProjectType)
@UseGuards(AuthGuard)
export class ProjectResolver {
    constructor(private projectService: ProjectService, private projectLoader: ProjectLoader) {}

    @Query(() => ProjectType)
    async project(@Args('id') id: string) {
        return this.projectService.getProject(id);
    }

    @Query(() => ProjectResponse)
    async projects(@Args() args: FindProjectArgs) {
        return await this.projectService.getProjects(args);
    }

    @ResolveField('arts', () => [ArtType], { nullable: true })
    public async getProjectArts(@Parent() project: ProjectType) {
        return await this.projectLoader.batchArts.load(project.id);
    }

    @Mutation(() => ProjectType)
    async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
        return this.projectService.createProject(createProjectInput);
    }

    @Mutation(() => ProjectType)
    async updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
        return await this.projectService.updateProject(updateProjectInput);
    }
}
