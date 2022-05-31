import { AuthGuard, RolesGuard } from '@/modules/auth';
import { ProjectType } from '@/modules/project/dto';
import { Role } from '@/modules/user';
import { Roles } from '@/shared/decorators/roles.decorator';
import { AppContext } from '@/shared/types';
import { ParseIntPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
    ArtCommentInput,
    ArtCommentType,
    ArtFileType,
    ArtResponse,
    ArtType,
    CreateArtInput,
    FindArtArgs,
    UpdateArtInput,
} from './dto';
import { ArtLoader } from './loaders';
import { ArtService } from './services';

@Resolver(() => ArtType)
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.USER, Role.ADMIN)
export class ArtResolver {
    constructor(private artService: ArtService, private artLoader: ArtLoader) {}

    @Query(() => ArtType)
    public art(@Args('id') id: string) {
        return this.artService.getArt(id);
    }

    @Query(() => ArtResponse)
    public arts(@Args() args: FindArtArgs) {
        return this.artService.getArts(args);
    }

    @ResolveField('project', () => ProjectType, { nullable: true })
    public getProject(@Parent() art: ArtType) {
        const { projectId } = art;

        return projectId ? this.artLoader.batchProjects.load(projectId) : null;
    }

    @ResolveField('files', () => [ArtFileType], { nullable: true })
    public getFiles(@Parent() art: ArtType) {
        const { id } = art;

        return this.artLoader.batchArtsFiles.load(id);
    }

    @Mutation(() => ArtType)
    public createArt(@Args('createArtInput') createArtInput: CreateArtInput) {
        return this.artService.createArt(createArtInput);
    }

    @Mutation(() => ArtType)
    public updateArt(@Args('updateArtInput') updateArtInput: UpdateArtInput) {
        return this.artService.updateArt(updateArtInput);
    }

    @Mutation(() => ArtCommentType)
    public addArtComment(
        @Args('artCommentInput') artCommentInput: ArtCommentInput,
        @Context() { currentUserId }: AppContext
    ) {
        return this.artService.addArtComment({
            ...artCommentInput,
            authorId: currentUserId,
        });
    }

    @Mutation(() => ArtCommentType)
    public updateArtComment(
        @Args('id', new ParseIntPipe()) id: number,
        @Args('text') text: string,
        @Context() { currentUserId }: AppContext
    ) {
        return this.artService.updateArtComment({
            commentId: id,
            text,
            authorId: currentUserId,
        });
    }

    @Mutation(() => Boolean)
    public async deleteArtComment(
        @Args('id', new ParseIntPipe()) id: number,
        @Args('artId', new ParseUUIDPipe()) artId: string,
        @Context() { currentUserId }: AppContext
    ) {
        await this.artService.deleteComment({
            commentId: id,
            artId,
            authorId: currentUserId,
        });
        return true;
    }

    @Mutation(() => [ArtType])
    public createManyArts(
        @Args('artsInput', { type: () => [CreateArtInput] }) artsInput: CreateArtInput[],
        @Context() { currentUserId }: AppContext
    ) {
        return this.artService.createManyArts(artsInput);
    }
}
