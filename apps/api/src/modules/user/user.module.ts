import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
