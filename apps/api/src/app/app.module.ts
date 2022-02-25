import { DbModule } from '@/db/db.module';
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
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SharedModule,

    LoggerModule,

    DbModule,

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
export class AppModule {}
