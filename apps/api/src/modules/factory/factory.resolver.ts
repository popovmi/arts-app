import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFactoryInput, FactoryType, UpdateFactoryInput } from './dto';
import { FactoryService } from './factory.service';

@Resolver(() => FactoryType)
export class FactoryResolver {
  constructor(readonly factoryService: FactoryService) {}

  @Mutation(() => FactoryType)
  public async createFactory(@Args('input') input: CreateFactoryInput) {
    return await this.factoryService.create(input);
  }

  @Query(() => [FactoryType])
  public async factories() {
    return await this.factoryService.findAll();
  }

  @Query(() => FactoryType)
  public async factory(@Args('id') id: string) {
    return await this.factoryService.findOne(id);
  }

  @Mutation(() => FactoryType)
  public async updateFactory(@Args('input') input: UpdateFactoryInput) {
    return await this.factoryService.update(input);
  }

  // @Mutation(() => Boolean)
  // public async remove(@Args('id') id: string) {
  //     await this.factoryService.remove(id);
  //     return true;
  // }
}
