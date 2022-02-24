import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ApiConfigService } from '..';
import { ASYNC_STORAGE } from './logger.constants';
import * as winstonLogger from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file';

const format = winstonLogger.format.combine(
  winstonLogger.format.timestamp({ format: () => new Date().toLocaleString() }),
  winstonLogger.format.ms()
);

const logger = winstonLogger.createLogger({
  transports: [
    new winstonLogger.transports.Console({
      format: winstonLogger.format.combine(
        format,
        nestWinstonModuleUtilities.format.nestLike('ARTsApplication', { prettyPrint: true })
      ),
    }),
    new winstonLogger.transports.DailyRotateFile({
      filename: './logs/arts-application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      format: winstonLogger.format.combine(format, winstonLogger.format.json()),
    }),
  ],
});

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
    private readonly config: ApiConfigService
  ) {
    logger.level = this.config.isProduction ? 'info' : 'debug';
  }

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  private winstonError(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    logger.error(logMessage, { traceId });
    if (trace) {
      logger.error(trace, { traceId });
    }
  }

  private winstonLog(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    logger.info(logMessage, { traceId });
  }

  private winstonWarn(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    logger.warn(logMessage, { traceId });
  }

  private winstonDebug(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    const logMessage = this.getMessage(message, context);

    logger.debug(logMessage, { traceId });
  }

  error(message: any, trace?: string, context?: string): any {
    this.winstonError(message, trace, context);
    // }
  }

  log(message: any, context?: string): any {
    this.winstonLog(message, context);
  }

  warn(message: any, context?: string): any {
    this.winstonWarn(message, context);
  }

  debug(message: any, context?: string): any {
    this.winstonDebug(message, context);
  }
}
