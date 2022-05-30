import { ArtType } from '@/modules/art/dto';
import { AuthGuard, RolesGuard } from '@/modules/auth';
import { CustomerType } from '@/modules/customer/dto';
import { FactoryType } from '@/modules/factory/dto';
import { Role } from '@/modules/user';
import { Roles } from '@/shared/decorators/roles.decorator';
import { AppContext } from '@/shared/types';
import { ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
    CreateProjectInput,
    FindProjectArgs,
    ProjectCommentInput,
    ProjectCommentType,
    ProjectResponse,
    ProjectType,
    UpdateProjectInput,
} from './dto';
import { ProjectLoader } from './loaders';
import { ProjectService } from './project.service';

@Resolver(() => ProjectType)
@UseGuards(AuthGuard, RolesGuard)
export class ProjectResolver {
    constructor(private projectService: ProjectService, private projectLoader: ProjectLoader) {}

	@Roles(Role.USER, Role.ADMIN)
    @Query(() => ProjectType)
    async project(@Args('id') id: string) {
        return this.projectService.getProject(id);
    }

	@Roles(Role.USER, Role.ADMIN)
    @Query(() => ProjectResponse)
    async projects(@Args() args: FindProjectArgs) {
        return await this.projectService.getProjects(args);
    }

    @ResolveField('arts', () => [ArtType], { nullable: true })
    public async getProjectArts(@Parent() project: ProjectType) {
        return await this.projectLoader.batchArts.load(project.id);
    }

    @ResolveField('customer', () => CustomerType, { nullable: true })
    public async getProjectsCustomers(@Parent() { customerId }: ProjectType) {
        return customerId ? await this.projectLoader.batchCustomers.load(customerId) : null;
    }

    @ResolveField('factory', () => FactoryType, { nullable: true })
    public async getProjectsFactories(@Parent() { factoryId }: ProjectType) {
        return factoryId ? await this.projectLoader.batchFactories.load(factoryId) : null;
    }

	@Roles(Role.USER, Role.ADMIN)
    @Mutation(() => ProjectType)
    async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
        return this.projectService.createProject(createProjectInput);
    }

	@Roles(Role.USER, Role.ADMIN)
    @Mutation(() => ProjectType)
    async updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
        return await this.projectService.updateProject(updateProjectInput);
    }

	@Roles(Role.USER, Role.ADMIN)
    @Mutation(() => ProjectCommentType)
    public async addProjectComment(
        @Args('projectCommentInput') projectCommentInput: ProjectCommentInput,
        @Context() { currentUserId }: AppContext
    ) {
        return this.projectService.addProjectComment({
            ...projectCommentInput,
            authorId: currentUserId,
        });
    }

	@Roles(Role.USER, Role.ADMIN)
    @Mutation(() => ProjectCommentType)
    public async updateProjectComment(
        @Args('id', new ParseIntPipe()) id: number,
        @Args('text') text: string,
        @Context() { currentUserId }: AppContext
    ) {
        return this.projectService.updateProjectComment({
            commentId: id,
            text,
            authorId: currentUserId,
        });
    }

	@Roles(Role.USER, Role.ADMIN)
    @Mutation(() => Boolean)
    public async deleteProjectComment(
        @Args('id', new ParseIntPipe()) id: number,
        @Context() { currentUserId }: AppContext
    ) {
        await this.projectService.deleteComment({
            commentId: id,
            authorId: currentUserId,
        });
        return true;
    }

	@Roles(Role.ADMIN)
    @Mutation(() => [Boolean])
    public async deleteProject(@Args('id', new ParseUUIDPipe()) id: string) {
        await this.projectService.deleteProject(id);
        return true;
    }
}
