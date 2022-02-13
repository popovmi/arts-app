import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginArgs, LoginResponse } from './dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  public async login(
    @Args() loginInput: LoginArgs,
    @Context() { res }: any
  ): Promise<LoginResponse> {
    const user = await this.authService.validateCredentials(loginInput);
    return { user };
  }
}
