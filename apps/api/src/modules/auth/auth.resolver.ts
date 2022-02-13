import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AppContext } from 'shared/types/context';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginArgs, LoginResponse } from './dto';
import { ChangePasswordArgs } from './dto/change-password.args';

@Resolver()
export class AuthResolver {
  constructor(readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  public async login(
    @Args() loginInput: LoginArgs,
    @Context()
    {
      httpContext: {
        req: { session },
      },
    }: AppContext
  ): Promise<LoginResponse> {
    session.loginAttempts = (session.loginAttempts || 0) + 1;

    const user = await this.authService.validateCredentials(loginInput);

    session.userId = user.id;
    session.isLoggedIn = true;
    session.loginAttempts = 0;

    return { user };
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  public logout(@Context() context: AppContext): boolean {
    const {
      httpContext: {
        req: { session },
      },
    } = context;

    session.destroy((err) => {
      if (err) console.log(err);
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  public async changePassword(
    @Args() changePasswordInput: ChangePasswordArgs,
    @Context() context: AppContext
  ): Promise<boolean> {
    const {
      httpContext: {
        req: { session },
      },
    } = context;

    await this.authService.changePassword(changePasswordInput);

    session.destroy((err) => {
      if (err) console.log(err);
    });

    return true;
  }
}
