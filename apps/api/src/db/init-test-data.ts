import { ArtFile } from '@/modules/art/entity/art-file.entity';
import { Art } from '@/modules/art/entity/art.entity';
import * as AttrEntities from '@/modules/attribute/entities';

import { Customer } from '@/modules/customer/entities/customer.entity';
import { Factory } from '@/modules/factory/entities/factory.entity';
import { Project } from '@/modules/project/entity/project.entity';
import { User } from '@/modules/user/entity/user.entity';
import { Role } from '@/modules/user/role.enum';
import { hash } from 'bcrypt';
import { config } from 'dotenv';
import { createConnection, EntityManager } from 'typeorm';
import ormConfig = require('../../ormconfig.local.js');

config();

export const initTestData = async (em: EntityManager) => {
  const users = [];
  const attributes = [];
  let customers = [];
  let factories = [];
  const projects = [];
  const arts = [];
  const attributesValues = ['qq', 'ww', 'ee', 'rr', 'tt', 'yy'];
  const artsFiles = [];

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
  await em.save(User, users);

  for (const AttrEntity of Object.values(AttrEntities)) {
    let i = 1;

    attributes.push(em.create(AttrEntity, { name: 'qq', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'ww', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'ee', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'rr', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'tt', valueOrder: i++ }));
    attributes.push(em.create(AttrEntity, { name: 'yy', valueOrder: i++ }));
  }
  await em.save(attributes);

  for (let i = 0; i < 20; i++) {
    customers.push({ name: `Customer ${i}` });
  }
  customers = await em.save(Customer, customers);

  for (let i = 0; i < 20; i++) {
    factories.push({ name: `Factory ${i}` });
  }
  factories = await em.save(Factory, factories);

  for (let i = 0; i < 200; i++) {
    projects.push({
      name: `PROJECT-${i}`,
      internal: Math.random() < 0.5,
      hasDesignDoc: Math.random() < 0.5,
      sfm: attributesValues[Math.floor(random(1, 7)) - 1],
      intercenter: attributesValues[Math.floor(random(1, 7)) - 1],
      dropNumber: attributesValues[Math.floor(random(1, 7)) - 1],
      factoryId: factories[Math.floor(random(1, factories.length)) - 1].id,
      customerId: customers[Math.floor(random(1, customers.length)) - 1].id,
    });
  }
  await em.save(Project, projects);

  for (let i = 0; i < 600; i++) {
    arts.push({
      name: `ART-${i}`,
      internal: Math.random() < 0.5,
      projectId: projects[i >= 200 ? (i >= 400 ? i - 400 : i - 200) : i]?.id,

      artClass: attributesValues[Math.floor(random(1, 6)) - 1],
      bottomForm: attributesValues[Math.floor(random(1, 6)) - 1],
      form: attributesValues[Math.floor(random(1, 6)) - 1],
      height: attributesValues[Math.floor(random(1, 6)) - 1],
      nominalVolume: attributesValues[Math.floor(random(1, 6)) - 1],
      productionMethod: attributesValues[Math.floor(random(1, 6)) - 1],
      productType: attributesValues[Math.floor(random(1, 6)) - 1],
      ringType: attributesValues[Math.floor(random(1, 6)) - 1],
    });
  }
  await em.save(Art, arts);

  arts.forEach((art) => {
    artsFiles.push({ artId: art.id, watermarkPath: 'Scan_0001.jpg', originalPath: 'Scan_0001.jpg' });
  });
  await em.save(ArtFile, artsFiles);
};

function random(min, max) {
  return min + Math.random() * (max - min);
}

const run = async () => {
  const connection = await createConnection(ormConfig);

  await initTestData(connection.manager);
};

run();
