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
  private logLevels: Array<'debug' | 'error' | 'log' | 'verbose' | 'warn'>;

  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
    private readonly config: ApiConfigService
  ) {
    if (this.config.isProduction) {
      this.logLevels = ['log', 'warn', 'error'];
      consoleLogger.level = 'info';
      fileLogger.level = 'info';
    } else {
      this.logLevels = ['debug', 'error', 'log', 'verbose', 'warn'];
      consoleLogger.level = 'trace';
      fileLogger.level = 'trace';
    }
  }

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  private pinoError(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    consoleLogger.error({ traceId }, logMessage);
    fileLogger.error({ traceId }, logMessage);
    if (trace) {
      consoleLogger.error(trace);
      fileLogger.error(trace);
    }
  }

  private pinoLog(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    consoleLogger.info({ traceId }, logMessage);
    fileLogger.info({ traceId }, logMessage);
  }

  private pinoWarn(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    consoleLogger.warn({ traceId }, logMessage);
    fileLogger.warn({ traceId }, logMessage);
  }

  private pinoDebug(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    consoleLogger.debug({ traceId }, logMessage);
    fileLogger.debug({ traceId }, logMessage);
  }

  error(message: any, trace?: string, context?: string): any {
    if (this.logLevels.includes('error')) {
      this.pinoError(message, trace, context);
    }
  }

  log(message: any, context?: string): any {
    if (this.logLevels.includes('log')) {
      this.pinoLog(message, context);
    }
  }

  warn(message: any, context?: string): any {
    if (this.logLevels.includes('warn')) {
      this.pinoWarn(message, context);
    }
  }

  debug(message: any, context?: string): any {
    if (this.logLevels.includes('debug')) {
      this.pinoDebug(message, context);
    }
  }
}
