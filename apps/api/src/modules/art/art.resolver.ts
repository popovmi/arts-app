import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'modules/auth/auth.guard';
import { CreateArtInput, ArtType } from './dto';
import { FindArtArgs } from './dto/find-arts.args';
import { ArtResponse } from './dto/arts.response';
import { UpdateArtInput } from './dto/update-art.input';
import { ArtService } from './art.service';

@Resolver(() => ArtType)
@UseGuards(AuthGuard)
export class ArtResolver {
  constructor(private artService: ArtService) {}

  @Query(() => ArtType)
  async art(@Args('id') id: string) {
    return this.artService.getArt(id);
  }

  @Query(() => ArtResponse)
  async arts(@Args() args: FindArtArgs) {
    return await this.artService.getArts(args);
  }

  @Mutation(() => ArtType)
  async createArt(@Args('createArtInput') createArtInput: CreateArtInput) {
    return this.artService.createArt(createArtInput);
  }

  @Mutation(() => ArtType)
  async updateArt(@Args('updateArtInput') updateArtInput: UpdateArtInput) {
    return await this.artService.updateArt(updateArtInput);
  }
}
