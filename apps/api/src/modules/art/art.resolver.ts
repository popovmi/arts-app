import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'modules/auth/auth.guard';
import { ProjectType } from 'modules/project/dto';
import { ArtService } from './services/art.service';
import { ArtType, CreateArtInput } from './dto';
import { ArtFileType } from './dto/art-file.type';
import { ArtResponse } from './dto/arts.response';
import { FindArtArgs } from './dto/find-arts.args';
import { UpdateArtInput } from './dto/update-art.input';
import { ArtLoader } from './loaders';
import { Selections } from '@jenyus-org/nestjs-graphql-utils';

@Resolver(() => ArtType)
@UseGuards(AuthGuard)
export class ArtResolver {
    constructor(private artService: ArtService, private artLoader: ArtLoader) {}

    @Query(() => ArtType)
    public async art(@Args('id') id: string) {
        return this.artService.getArt(id);
    }

    @Query(() => ArtResponse)
    public async arts(
        @Args() args: FindArtArgs,
        @Selections('arts.page.edges.node', ['*.']) fields: string[],
        @Selections('arts.page.edges.node.project', ['*.']) projectFields: string[],
        @Selections('arts.page.edges.node.files', ['*.']) filesFields: string[],
        @Selections('arts.page.edges.node', ['**']) relations: string[]
    ) {
        return await this.artService.getArts(args, [...fields], relations, [
            ...projectFields.map((prField) => `project.${prField}`),
            ...filesFields.map((flField) => `files.${flField}`),
        ]);
    }

    // @ResolveField('project', () => ProjectType, { nullable: true })
    // public async getProject(@Parent() art: ArtType) {
    //     const { projectId } = art;
    //     return projectId ? await this.artLoader.batchProjects.load(projectId) : null;
    // }

    // @ResolveField('files', () => [ArtFileType], { nullable: true })
    // public async getFiles(@Parent() art: ArtType) {
    //     const { id } = art;
    //     return await this.artLoader.batchArtsFiles.load(id);
    // }

    @Mutation(() => ArtType)
    public async createArt(@Args('createArtInput') createArtInput: CreateArtInput) {
        return await this.artService.createArt(createArtInput);
    }

    @Mutation(() => ArtType)
    public async updateArt(@Args('updateArtInput') updateArtInput: UpdateArtInput) {
        return await this.artService.updateArt(updateArtInput);
    }
}
