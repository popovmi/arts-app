import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initTestData } from 'db/initTestData';
import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import { v4 } from 'uuid';
import { AppModule } from './app/app.module';
import { ApiConfigService } from 'shared/services/api-config.service';
import { Pool } from 'pg';

const PGSession = pgSession(session);

async function bootstrap() {
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
      cookie: { maxAge: 86400, domain: 'localhost', path: '/' },
      store: new PGSession({
        ttl: 86400,
        pool,
        pruneSessionInterval: 60,
        tableName: 'session',
      }),
    })
  );

  if (process.env.NODE_ENV === 'development') {
    await initTestData(app);
  }

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
