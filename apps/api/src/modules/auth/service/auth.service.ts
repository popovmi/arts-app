import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'modules/user/entity/user.entity';
import { ILike, Repository } from 'typeorm';
import { LoginArgs, ChangePasswordArgs } from '../dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        readonly passwordService: PasswordService
    ) {}

    public async validateCredentials({ username, password }: LoginArgs) {
        const user = await this.userRepository.findOne({ username: ILike(username), active: true });

        if (!user || !(await this.passwordService.compare(password, user.password)))
            throw new UnauthorizedException('Неверные данные для входа');

        return user;
    }

    public async changePassword({ username, password, newPassword }: ChangePasswordArgs) {
        const user = await this.validateCredentials({ username, password });
        await this.userRepository.update(
            { id: user.id },
            { password: await this.passwordService.hash(newPassword) }
        );
    }
}
