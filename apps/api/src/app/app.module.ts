import { ApolloDriver } from '@nestjs/apollo';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { InjectEntityManager, TypeOrmModule } from '@nestjs/typeorm';
import { initTestData } from 'db/init-test-data';
import { ArtModule } from 'modules/art/art.module';
import { AttributeModule } from 'modules/attribute/attribute.module';
import { AuthModule } from 'modules/auth';
import { CustomerModule } from 'modules/customer/customer.module';
import { FactoryModule } from 'modules/factory/factory.module';
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
