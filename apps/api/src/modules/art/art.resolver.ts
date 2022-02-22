import { AuthGuard } from '@/modules/auth/auth.guard';
import { ProjectType } from '@/modules/project/dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArtFileType, ArtResponse, ArtType, CreateArtInput, FindArtArgs, UpdateArtInput } from './dto';
import { ArtLoader } from './loaders';
import { ArtService } from './services';

@Resolver(() => ArtType)
@UseGuards(AuthGuard)
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

    return projectId ? await this.artLoader.batchProjects.load(projectId) : null;
  }

  @ResolveField('files', () => [ArtFileType], { nullable: true })
  public async getFiles(@Parent() art: ArtType) {
    const { id } = art;

    return await this.artLoader.batchArtsFiles.load(id);
  }

  @Mutation(() => ArtType)
  public async createArt(@Args('createArtInput') createArtInput: CreateArtInput) {
    return await this.artService.createArt(createArtInput);
  }

  @Mutation(() => ArtType)
  public async updateArt(@Args('updateArtInput') updateArtInput: UpdateArtInput) {
    return await this.artService.updateArt(updateArtInput);
  }
}
