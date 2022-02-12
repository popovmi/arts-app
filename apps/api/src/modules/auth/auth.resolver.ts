import { Query, Args, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto';
import { LoginResponse } from './dto/login.response';

@Resolver('Auth')
export class AuthResolver {
  constructor(readonly authService: AuthService) {}

  @Query(() => LoginResponse)
  public async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateCredentials(loginInput);
    return { user };
  }
}
