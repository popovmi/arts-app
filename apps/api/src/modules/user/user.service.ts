import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'modules/auth/password.service';
import { filterQuery } from 'shared/utils/query-builder';
import { Repository } from 'typeorm';
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

  async getUsers(take, skip, filter): Promise<[User[], number]> {
    const query = filterQuery(this.userRepository.createQueryBuilder().select(), filter);
    query.skip(skip);
    query.take(take);
    return await query.getManyAndCount();
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

    return await this.userRepository.save(user);
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
