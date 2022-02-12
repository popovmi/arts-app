import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [PasswordService, AuthService, AuthResolver],
  exports: [PasswordService],
})
export class AuthModule {}
