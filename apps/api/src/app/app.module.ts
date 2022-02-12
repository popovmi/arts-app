import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user';
import { DateScalar } from '../shared/scalar/date.scalar';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        synchronize: true,
        dropSchema: true,
        autoLoadEntities: true,
        keepConnectionAlive: true,
        logging: ['error', 'info', 'log', 'migration', 'query', 'schema', 'warn'],
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
    }),

    UserModule,
    AuthModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
