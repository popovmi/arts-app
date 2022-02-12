import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../auth/password.service';
import { CreateUserInput, UpdateUserInput } from './dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    readonly passwordService: PasswordService
  ) {}

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { active, fullName, password, role, username } = createUserInput.format();

    const user = this.userRepository.create({
      username,
      active,
      fullName,
      role,
      password: await this.passwordService.hash(password),
    });

    return this.userRepository.save(user);
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, password, ...updateInput } = updateUserInput.format();
    const user = await this.userRepository.findOneOrFail({ id });

    Object.assign(user, {
      ...updateInput,
      ...(password ? { password: await this.passwordService.hash(password) } : {}),
    });

    return await this.userRepository.save(user);
  }
}
