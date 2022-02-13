import { NestExpressApplication } from '@nestjs/platform-express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { User } from 'modules/user/entity/user.entity';
import { Role } from 'modules/user/role.enum';
import { Repository } from 'typeorm';

export const initTestData = async (app: NestExpressApplication) => {
  const repository = app.get<Repository<User>>(getRepositoryToken(User));
  const data = [];

  data.push({
    username: `ADMIN`,
    role: Role.ADMIN,
    active: false,
    fullName: `Администратор`,
    password: await hash('USER', 10),
  });
  for (let i = 0; i < 10; i++) {
    data.push({
      username: `USER${i}`,
      role: Role.USER,
      active: false,
      fullName: `Пользователь ${i}`,
      password: await hash('USER', 10),
    });
  }

  await repository.save(data);
};
