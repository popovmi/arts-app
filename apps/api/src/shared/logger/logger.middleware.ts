import { INestApplication } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Request } from 'express';
import { v4 } from 'uuid';
import { ASYNC_STORAGE } from './logger.constants';

export const loggerMiddleware = (app: INestApplication) => (req: Request, res, next) => {
    const asyncStorage = app.get<AsyncLocalStorage<Map<string, string>>>(ASYNC_STORAGE);
    const store = new Map()
        .set('traceId', req.headers['x-request-id'] || v4())
        // .set('requestUA', req.headers['user-agent'])
        .set('sessionId', req.session?.id)
        .set('userId', req.session?.userId)
        .set('requestIP', (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.ip);
    asyncStorage.enterWith(store);
    next();
};
