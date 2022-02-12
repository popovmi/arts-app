import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { LoginInput } from './dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    readonly passwordService: PasswordService
  ) {}

  public async validateCredentials({ username, password }: LoginInput) {
    const user = await this.userRepository.findOne({ username: ILike(username) });

    if (!user || !(await this.passwordService.compare(password, user.password)))
      throw new UnauthorizedException('Неверные данные для входа');

    return user;
  }
}
