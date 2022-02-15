import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseAttribute } from './entities/base-attribute.entity';
import { createAttributeResolverClass } from './utils/create-resolver-class';
import { createAttributeServiceClass } from './utils/create-service-class';

@Module({})
export class BaseAttributeModule {
  static register(entities: typeof BaseAttribute[]): DynamicModule {
    const services = entities.map((entity) => ({
      provide: `${entity.name}Service`,
      useClass: createAttributeServiceClass(entity),
    }));
    const resolvers = entities.map((entity) => createAttributeResolverClass(entity));
    return {
      module: BaseAttributeModule,
      imports: [TypeOrmModule.forFeature(entities)],
      providers: [...services, ...resolvers],
    };
  }
}
