import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/modules/user';
import { AuthResolver } from './auth.resolver';
import { Session } from './entity/session.entity';
import { PasswordService, AuthService } from './service';

@Module({
    imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Session])],
    providers: [PasswordService, AuthService, AuthResolver],
    exports: [PasswordService],
})
export class AuthModule {}
