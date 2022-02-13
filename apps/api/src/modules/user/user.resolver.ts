import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { FindUsersArgs, UpdateUserInput, UserType } from './dto';
import { CreateUserInput } from './dto/create-user.input';
import UserResponse from './dto/users.response';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  async user(@Args('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Query(() => UserResponse)
  async users(@Args() { filter, pagination }: FindUsersArgs) {
    const { take, skip } = pagination.pagingParams();
    const [users, count] = await this.userService.getUsers(take, skip, filter);
    const page = connectionFromArraySlice(users, pagination, { arrayLength: count, sliceStart: skip || 0 });

    return { page, pageData: { count, take, skip } };
  }

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.updateUser(updateUserInput);
  }
}
