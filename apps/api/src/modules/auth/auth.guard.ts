import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppContext } from '@/shared/types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext<AppContext>();

    if (!ctx.session.isLoggedIn) throw new UnauthorizedException();

    return true;
  }
}
