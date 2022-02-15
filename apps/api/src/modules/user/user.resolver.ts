import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, FindUsersArgs, UpdateUserInput, UserResponse, UserType } from './dto';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => UserType)
    async user(@Args('id') id: string) {
        return await this.userService.getUser(id);
    }

    @Query(() => UserResponse)
    async users(@Args() args: FindUsersArgs) {
        return this.userService.getUsers(args);
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
