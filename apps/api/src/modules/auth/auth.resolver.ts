import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AppContext } from 'shared/types/context';
import { AuthService } from './auth.service';
import { LoginArgs, LoginResponse } from './dto';

@Resolver()
export class AuthResolver {
  constructor(readonly authService: AuthService) {}

  @Query(() => LoginResponse)
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
}
