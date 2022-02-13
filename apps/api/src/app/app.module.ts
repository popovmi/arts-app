import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/user';
import { SharedModule, ApiConfigService } from 'shared';

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
  ],
})
export class AppModule {}
