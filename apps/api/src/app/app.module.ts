import { initTestData } from '@/db/init-test-data';
import { ArtModule } from '@/modules/art/art.module';
import { AttributeModule } from '@/modules/attribute/attribute.module';
import { AuthModule } from '@/modules/auth';
import { CustomerModule } from '@/modules/customer/customer.module';
import { FactoryModule } from '@/modules/factory/factory.module';
import { ProjectModule } from '@/modules/project/project.module';
import { UserModule } from '@/modules/user';
import { ApiConfigService, SharedModule } from '@/shared';
import { LoggerModule } from '@/shared/logger';
import { ApolloDriver } from '@nestjs/apollo';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { InjectEntityManager, TypeOrmModule } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { EntityManager } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SharedModule,

    LoggerModule,

    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => config.typeOrmConfig,
    }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => config.graphQLConfig,
    }),

    ServeStaticModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: async (config: ApiConfigService) => [
        {
          exclude: ['/graphql'],
          rootPath: resolve(config.fileStoragePath),
          serveRoot: '/static',
        },
        {
          exclude: ['/graphql'],
          rootPath: './upload',
          serveRoot: '/upload',
        },
        {
          exclude: ['/graphql'],
          rootPath: join(__dirname, '..', 'ui'),
        },
      ],
    }),

    UserModule,

    AuthModule,

    ProjectModule,

    ArtModule,

    AttributeModule,

    FactoryModule,

    CustomerModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(@InjectEntityManager() readonly em: EntityManager, readonly config: ApiConfigService) {}

  async onApplicationBootstrap() {
    if (this.config.isDevelopment) {
      await initTestData(this.em);
    }
  }
}
