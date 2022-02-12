import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType, UpdateUserInput } from './dto';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

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
