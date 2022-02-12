import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse } from './dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  public async login(@Args('loginInput') loginInput: LoginInput, @Context() { res }: any) {
    console.log(res);
    const user = await this.authService.validateCredentials(loginInput);
    return { user };
  }
}
