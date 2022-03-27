import { AppModule } from '@/app/app.module';
import { ApiConfigService } from '@/shared';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as pgSession from 'connect-pg-simple';
import { Request } from 'express';
import * as session from 'express-session';
import { Pool } from 'pg';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { v4 } from 'uuid';
import { QueryFailedFilter } from './shared/filters';
import { ASYNC_STORAGE, LoggerService } from './shared/logger';

const PGSession = pgSession(session);

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const apiConfig = app.get<ApiConfigService>(ApiConfigService);
  const port = process.env.PORT || 3333;
  const reflector = app.get<Reflector>(Reflector);
  const pool = new Pool({
    connectionString: apiConfig.get('DATABASE_URL'),
    min: 2,
    max: 5,
  });
  const logger = app.get(LoggerService);

  if (apiConfig.isProduction) {
    app.set('trust proxy', 1);
  }
  app.use(
    session({
      name: 'aa_sid',
      secret: 'super_session_secret',
      genid: () => v4(),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000,
        domain: process.env.DOMAIN || 'localhost',
        path: '/',
        secure: apiConfig.isProduction,
        httpOnly: true,
        sameSite: 'strict',
      },
      store: new PGSession({
        pool,
        pruneSessionInterval: 60,
        tableName: 'session',
      }),
    })
  );
  app.use((req: Request, res, next) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    const traceId = req.headers['x-request-id'] || v4();
    const store = new Map()
      .set('traceId', traceId)
      .set('userId', req.session?.userId);

    asyncStorage.run(store, () => {
      next();
    });
  });
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    /* new HttpExceptionFilter(reflector), */ new QueryFailedFilter(reflector)
  );
  app.disable('x-powered-by');

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`, 'MAIN');
}

bootstrap();
