import { ApolloDriver } from '@nestjs/apollo';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { InjectEntityManager, TypeOrmModule } from '@nestjs/typeorm';
import { initTestData } from 'db/initTestData';
import { ArtModule } from 'modules/art/art.module';
import { AuthModule } from 'modules/auth';
import { ProjectModule } from 'modules/project/project.module';
import { UserModule } from 'modules/user';
import { ApiConfigService, SharedModule } from 'shared';
import { EntityManager } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SharedModule,

    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => config.typeOrmConfig,
    }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => config.graphQLConfig,
    }),

    UserModule,

    AuthModule,

    ProjectModule,

    ArtModule,
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
