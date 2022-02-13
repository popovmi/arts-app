import { Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from 'modules/user/dto';
import { UserService } from 'modules/user/user.service';
import { AppContext } from 'shared/types/context';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginArgs, LoginResponse } from './dto';
import { ChangePasswordArgs } from './dto/change-password.args';

@Resolver()
export class AuthResolver {
  constructor(readonly authService: AuthService, readonly userService: UserService) {}

  @Mutation(() => LoginResponse)
  public async login(@Args() loginInput: LoginArgs, @Context() { session }: AppContext): Promise<LoginResponse> {
    session.loginAttempts = (session.loginAttempts || 0) + 1;

    const user = await this.authService.validateCredentials(loginInput);

    session.userId = user.id;
    session.isLoggedIn = true;
    session.loginAttempts = 0;

    return { user };
  }

  @Query(() => UserType)
  @UseGuards(AuthGuard)
  public async whoAmI(@Context() { currentUserId }: AppContext) {
    return await this.userService.getUser(currentUserId);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  public logout(@Context() { session }: AppContext): boolean {
    session.destroy((err) => {
      if (err) Logger.error(err);
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  public async changePassword(
    @Args() changePasswordInput: ChangePasswordArgs,
    @Context() { session }: AppContext
  ): Promise<boolean> {
    await this.authService.changePassword(changePasswordInput);

    session.destroy((err) => {
      if (err) console.log(err);
    });

    return true;
  }
}
