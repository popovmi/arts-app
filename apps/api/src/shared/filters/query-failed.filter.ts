import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { QueryFailedError } from 'typeorm';
import { ConstraintErrors } from './constraint-errors';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
    private logger = new Logger(QueryFailedFilter.name);

    constructor(public reflector: Reflector) {}

    catch(exception: any, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        this.logger.error(exception.message, exception.stack);

        const errorMessage = ConstraintErrors[exception.constraint];

        const status =
            exception.constraint &&
            (exception.constraint.startsWith('UQ') || exception.constraint.startsWith('FK'))
                ? HttpStatus.CONFLICT
                : HttpStatus.INTERNAL_SERVER_ERROR;

        return new HttpException(errorMessage || exception.message, status);
    }
}
