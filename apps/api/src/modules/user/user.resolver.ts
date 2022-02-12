import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { UpdateUserInput } from './update-user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  async user(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Query(() => [UserType])
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput);
  }
}
