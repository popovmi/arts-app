import { AuthGuard, RolesGuard } from '@/modules/auth';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserInput,
  FindUsersArgs,
  UpdateUserInput,
  UserResponse,
  UserType,
} from './dto';
import { Role } from './role.enum';
import { UserService } from './user.service';

@Resolver(() => UserType)
@UseGuards(AuthGuard, RolesGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  @Roles(Role.ADMIN)
  async user(@Args('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Query(() => UserResponse)
  @Roles(Role.ADMIN)
  async users(@Args() args: FindUsersArgs) {
    return this.userService.getUsers(args);
  }

  @Mutation(() => UserType)
  @Roles(Role.ADMIN)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  @Roles(Role.ADMIN)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.updateUser(updateUserInput);
  }
}
