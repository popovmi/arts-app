import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import pinoLogger from 'pino';
import { ApiConfigService } from '..';
import { ASYNC_STORAGE } from './logger.constants';

const consoleLogger = pinoLogger({
  prettyPrint: true,
});

const fileLogger = pinoLogger({}, pinoLogger.destination('./logs/api.log'));

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
    private readonly config: ApiConfigService
  ) {}

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  private pinoError(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');

    consoleLogger.error({ traceId }, this.getMessage(message, context));
    fileLogger.error({ traceId }, this.getMessage(message, context));
    if (trace) {
      consoleLogger.error(trace);
      fileLogger.error(trace);
    }
  }

  private pinoLog(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');

    consoleLogger.info({ traceId }, this.getMessage(message, context));
    fileLogger.info({ traceId }, this.getMessage(message, context));
  }

  private pinoWarn(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');

    consoleLogger.warn({ traceId }, this.getMessage(message, context));
    fileLogger.warn({ traceId }, this.getMessage(message, context));
  }

  error(message: any, trace?: string, context?: string): any {
    this.pinoError(message, trace, context);
  }

  log(message: any, context?: string): any {
    this.pinoLog(message, context);
  }

  warn(message: any, context?: string): any {
    this.pinoWarn(message, context);
  }
}
