import { ArtType } from '@/modules/art/dto';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerType } from '../customer/dto';
import { FactoryType } from '../factory/dto';
import { CreateProjectInput, FindProjectArgs, ProjectResponse, ProjectType, UpdateProjectInput } from './dto';
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
		console.log(args);
		
        return await this.projectService.getProjects(args);
    }

    @ResolveField('arts', () => [ArtType], { nullable: true })
    public async getProjectArts(@Parent() project: ProjectType) {
        return await this.projectLoader.batchArts.load(project.id);
    }

    @ResolveField('customer', () => CustomerType, { nullable: true })
    public async getProjectsCustomers(@Parent() project: ProjectType) {
        return await this.projectLoader.batchCustomers.load(project.customerId);
    }

    @ResolveField('factory', () => FactoryType, { nullable: true })
    public async getProjectsFactories(@Parent() project: ProjectType) {
        return await this.projectLoader.batchFactories.load(project.factoryId);
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
