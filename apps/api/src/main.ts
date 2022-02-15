import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as pgSession from 'connect-pg-simple';
import * as session from 'express-session';
import { Pool } from 'pg';
import { ApiConfigService } from 'shared';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { v4 } from 'uuid';
import { AppModule } from './app/app.module';

const PGSession = pgSession(session);

async function bootstrap() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.PORT || 3333;
    const apiConfig = app.get<ApiConfigService>(ApiConfigService);
    const pool = new Pool({
        connectionString: apiConfig.get('DATABASE_URL'),
        min: 2,
        max: 5,
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(
        session({
            name: 'aa_sid',
            secret: 'super_session_secret',
            genid: () => v4(),
            saveUninitialized: false,
            resave: false,
            cookie: { maxAge: 86400000, domain: 'localhost', path: '/' },
            store: new PGSession({
                pool,
                pruneSessionInterval: 60,
                tableName: 'session',
            }),
        })
    );

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
