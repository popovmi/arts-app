import { hash } from 'bcrypt';
import { Art } from 'modules/art/entity/art.entity';
import { Project } from 'modules/project/entity/project.entity';
import { User } from 'modules/user/entity/user.entity';
import { Role } from 'modules/user/role.enum';
import { EntityManager } from 'typeorm';

import * as AttrEntities from 'modules/attribute/entities';

export const initTestData = async (em: EntityManager) => {
  const userRep = em.getRepository(User);
  const users = [];
  users.push({
    username: `ADMIN`,
    role: Role.ADMIN,
    active: true,
    fullName: `Администратор`,
    password: await hash('USER', 10),
  });
  for (let i = 0; i < 10; i++) {
    users.push({
      username: `USER${i}`,
      role: Role.USER,
      active: false,
      fullName: `Пользователь ${i}`,
      password: await hash('USER', 10),
    });
  }
  await userRep.save(users);

  const projectRep = em.getRepository(Project);
  let projects = [];
  for (let i = 0; i < 200; i++) {
    projects.push({
      name: `PROJECT-${i}`,
      internal: Math.random() < 0.5,
      hasDesignDoc: Math.random() < 0.5,
    });
  }
  projects = await projectRep.save(projects);

  const artsRep = em.getRepository(Art);
  let arts = [];
  for (let i = 0; i < 600; i++) {
    arts.push({
      name: `ART-${i}`,
      internal: Math.random() < 0.5,
      projectId: projects[i > 200 ? (i > 400 ? i - 400 : i - 200) : i]?.id,
    });
  }
  arts = await artsRep.save(arts);

  let attributes = [];
  for (const AttrEntity of Object.values(AttrEntities)) {
    let i = 1;
    attributes.push(em.create(AttrEntity, { name: 'qq', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'ww', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'ee', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'rr', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'tt', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'yy', valueOrder: i++ }));
  }
  attributes = await em.save(attributes);
};
