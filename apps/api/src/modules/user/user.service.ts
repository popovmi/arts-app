import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { PasswordService } from '@/modules/auth/service';
import { filterQuery, orderQuery } from '@/shared/utils/query-builder';
import { Repository } from 'typeorm';
import { CreateUserInput, FindUsersArgs, UpdateUserInput, UserResponse } from './dto';
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

    async getUsers({ filter, pagination, order }: FindUsersArgs): Promise<UserResponse> {
        const query = filterQuery(this.userRepository.createQueryBuilder('users'), 'users', filter);
        const { take = 50, skip = 0 } = pagination.pagingParams();

        query.skip(skip);
        query.take(take);
        query.orderBy('users.username', 'ASC');
        // orderQuery(query, { ...order });

        const [users, count] = await query.getManyAndCount();
        const page = connectionFromArraySlice(users, pagination, { arrayLength: count, sliceStart: skip || 0 });

        return { page, pageData: { count, take, skip } };
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
