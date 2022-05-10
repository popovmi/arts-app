import { AuthGuard, RolesGuard } from '@/modules/auth';
import { ProjectType } from '@/modules/project/dto';
import { Role } from '@/modules/user';
import { Roles } from '@/shared/decorators/roles.decorator';
import { AppContext } from '@/shared/types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  ArtCommentInput,
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
  public async art(@Args('id') id: string) {
    return this.artService.getArt(id);
  }

  @Query(() => ArtResponse)
  public async arts(@Args() args: FindArtArgs) {
    return await this.artService.getArts(args);
  }

  @ResolveField('project', () => ProjectType, { nullable: true })
  public async getProject(@Parent() art: ArtType) {
    const { projectId } = art;

    return projectId
      ? await this.artLoader.batchProjects.load(projectId)
      : null;
  }

  @ResolveField('files', () => [ArtFileType], { nullable: true })
  public async getFiles(@Parent() art: ArtType) {
    const { id } = art;

    return await this.artLoader.batchArtsFiles.load(id);
  }

  @Mutation(() => ArtType)
  public async createArt(
    @Args('createArtInput') createArtInput: CreateArtInput
  ) {
    return await this.artService.createArt(createArtInput);
  }

  @Mutation(() => ArtType)
  public async updateArt(
    @Args('updateArtInput') updateArtInput: UpdateArtInput
  ) {
    return await this.artService.updateArt(updateArtInput);
  }

  @Mutation(() => ArtType)
  public async addArtComment(
    @Args('artCommentInput') artCommentInput: ArtCommentInput,
    @Context() { currentUserId }: AppContext
  ) {
    return this.artService.addArtComment({
      ...artCommentInput,
      authorId: currentUserId,
    });
  }

  @Mutation(() => Boolean)
  public async updateArtComment(
    @Args('id', new ParseIntPipe()) id: number,
    @Args('text') text: string,
    @Context() { currentUserId }: AppContext
  ) {
    await this.artService.updateArtComment({
      commentId: id,
      text,
      authorId: currentUserId,
    });
    return true;
  }

  @Mutation(() => Boolean)
  public async deleteArtComment(
    @Args('id', new ParseIntPipe()) id: number,
    @Context() { currentUserId }: AppContext
  ) {
    await this.artService.deleteComment({
      commentId: id,
      authorId: currentUserId,
    });
    return true;
  }
}
