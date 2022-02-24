import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './logger.constants';
import { LoggerService } from './logger.service';

const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  providers: [
    LoggerService,
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
