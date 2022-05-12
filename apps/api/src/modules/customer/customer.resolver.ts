import { AuthGuard, RolesGuard } from '@/modules/auth';
import { Role } from '@/modules/user';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  CustomerType,
  FindCustomerArgs,
  UpdateCustomerInput,
} from './dto';

@Resolver(() => CustomerType)
@UseGuards(AuthGuard, RolesGuard)
export class CustomerResolver {
  constructor(readonly customerService: CustomerService) {}

  @Mutation(() => CustomerType)
  @Roles(Role.ADMIN)
  public async createCustomer(@Args('input') input: CreateCustomerInput) {
    return await this.customerService.create(input);
  }

  @Query(() => [CustomerType])
  @Roles(Role.ADMIN, Role.USER)
  public async customers(@Args() args: FindCustomerArgs) {
    return await this.customerService.findAll(args);
  }

  @Query(() => CustomerType)
  @Roles(Role.ADMIN, Role.USER)
  public async customer(@Args('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Mutation(() => CustomerType)
  @Roles(Role.ADMIN)
  public async updateCustomer(@Args('input') input: UpdateCustomerInput) {
    return await this.customerService.update(input);
  }

  // @Mutation(() => Boolean)
  // public async remove(@Args('id') id: string) {
  //     await this.factoryService.remove(id);
  //     return true;
  // }
}
