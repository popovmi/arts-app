import { AuthGuard, RolesGuard } from '@/modules/auth';
import { Role } from '@/modules/user';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateFactoryInput,
  FactoryType,
  FindFactoryArgs,
  UpdateFactoryInput,
} from './dto';
import { FactoryService } from './factory.service';

@Resolver(() => FactoryType)
@UseGuards(AuthGuard, RolesGuard)
export class FactoryResolver {
  constructor(readonly factoryService: FactoryService) {}

  @Mutation(() => FactoryType)
  @Roles(Role.ADMIN)
  public async createFactory(@Args('input') input: CreateFactoryInput) {
    return await this.factoryService.create(input);
  }

  @Query(() => [FactoryType])
  @Roles(Role.ADMIN, Role.USER)
  public async factories(@Args() args: FindFactoryArgs) {
    return await this.factoryService.findAll(args);
  }

  @Query(() => FactoryType)
  @Roles(Role.ADMIN, Role.USER)
  public async factory(@Args('id') id: string) {
    return await this.factoryService.findOne(id);
  }

  @Mutation(() => FactoryType)
  @Roles(Role.ADMIN)
  public async updateFactory(@Args('input') input: UpdateFactoryInput) {
    return await this.factoryService.update(input);
  }

  // @Mutation(() => Boolean)
  // public async remove(@Args('id') id: string) {
  //     await this.factoryService.remove(id);
  //     return true;
  // }
}
