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

const consoleTransport = new winstonLogger.transports.Console({
  format: winstonLogger.format.combine(
    format,
    nestWinstonModuleUtilities.format.nestLike('ARTsApplication', { prettyPrint: true })
  ),
});

const fileTransport = new winstonLogger.transports.DailyRotateFile({
  filename: './logs/arts-application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  format: winstonLogger.format.combine(format, winstonLogger.format.json()),
});

export const logger = winstonLogger.createLogger({
  transports: [consoleTransport, fileTransport],
});

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
    private readonly config: ApiConfigService
  ) {
    logger.level = this.config.isProduction ? 'info' : 'debug';

    const traceIdExtractor = winstonLogger.format((info) => {
      const traceId = this.asyncStorage.getStore()?.get('traceId');
      info.traceId = traceId;
      return info;
    });

    [consoleTransport, fileTransport].forEach((transport) => {
      transport.format = winstonLogger.format.combine(traceIdExtractor(), transport.format);
    });
  }

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  private winstonError(message: any, trace?: string, context?: string): any {
    const logMessage = this.getMessage(message, context);

    logger.error(logMessage);
    if (trace) {
      logger.error(trace);
    }
  }

  private winstonLog(message: any, context?: string): any {
    const logMessage = this.getMessage(message, context);

    logger.info(logMessage);
  }

  private winstonWarn(message: any, context?: string): any {
    const logMessage = this.getMessage(message, context);

    logger.warn(logMessage);
  }

  private winstonDebug(message: any, context?: string): any {
    const logMessage = this.getMessage(message, context);

    logger.debug(logMessage);
  }

  error(message: any, trace?: string, context?: string): any {
    this.winstonError(message, trace, context);
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
