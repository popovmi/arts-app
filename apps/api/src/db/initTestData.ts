import { hash } from 'bcrypt';
import { User } from 'modules/user/entity/user.entity';
import { Role } from 'modules/user/role.enum';
import { EntityManager } from 'typeorm';

export const initTestData = async (em: EntityManager) => {
  const repository = em.getRepository(User);
  const data = [];

  data.push({
    username: `ADMIN`,
    role: Role.ADMIN,
    active: true,
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
