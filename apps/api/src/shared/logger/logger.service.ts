/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import * as winstonLogger from 'winston';
import 'winston-daily-rotate-file';
import { ApiConfigService } from '../services/api-config.service';
import { ASYNC_STORAGE } from './logger.constants';
import { consoleFormat } from './logger.utils';

const format = winstonLogger.format.combine(
    winstonLogger.format.timestamp({
        format: () => new Date().toLocaleString(),
    }),
    winstonLogger.format.ms()
);

const consoleTransport = new winstonLogger.transports.Console({
    format: winstonLogger.format.combine(format, consoleFormat('RelaxClubAPI', { prettyPrint: true })),
});

const fileTransport = new winstonLogger.transports.DailyRotateFile({
    filename: './logs/relax-club-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    format: winstonLogger.format.combine(format, winstonLogger.format.json()),
});

export const logger = winstonLogger.createLogger({
    transports: [consoleTransport, fileTransport],
});

const telegramKeys = ['traceId', 'telegramId', 'telegramUpdateId'];
const appClientKeys = ['traceId', 'sessionId', 'userId', 'requestIP', 'requestUA'];

@Injectable()
export class LoggerService implements NestLoggerService {
    constructor(
        @Inject(ASYNC_STORAGE)
        private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
        private readonly config: ApiConfigService
    ) {
        logger.level = this.config.isProduction ? 'info' : 'debug';
        [consoleTransport, fileTransport].forEach((transport) => {
            transport.format = winstonLogger.format.combine(this.metaExtractor(), transport.format);
        });
    }

    private metaExtractor = winstonLogger.format((info) => {
        const store = this.asyncStorage.getStore();
        if (store) {
            (store.get('telegramId') ? telegramKeys : appClientKeys).forEach(
                (key) => (info[key] = store.get(key))
            );
        }
        return info;
    });

    public log(message: any, context?: string): any {
        if ('object' === typeof message) {
            const { message: msg, ...meta } = message;
            return logger.info(msg as string, { context, ...meta });
        }
        return logger.info(message, { context });
    }

    public error(message: any, trace?: string, context?: string): any {
        if (message instanceof Error) {
            const { message: msg, ...meta } = message;
            return logger.error(msg, {
                context,
                stack: [trace || message.stack],
                ...meta,
            });
        }
        if ('object' === typeof message) {
            const { message: msg, ...meta } = message;
            return logger.error(msg as string, {
                context,
                stack: [trace],
                ...meta,
            });
        }
        return logger.error(message, { context, stack: [trace] });
    }

    public warn(message: any, context?: string): any {
        if ('object' === typeof message) {
            const { message: msg, ...meta } = message;
            return logger.warn(msg as string, { context, ...meta });
        }
        return logger.warn(message, { context });
    }

    public debug?(message: any, context?: string): any {
        if ('object' === typeof message) {
            const { message: msg, ...meta } = message;
            return logger.debug(msg as string, { context, ...meta });
        }
        return logger.debug(message, { context });
    }

    public verbose?(message: any, context?: string): any {
        if ('object' === typeof message) {
            const { message: msg, ...meta } = message;
            return logger.verbose(msg as string, {
                context,
                ...meta,
            });
        }
        return logger.verbose(message, { context });
    }
}
