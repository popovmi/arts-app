import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppContext } from 'shared/types/context';

@Injectable()
export class ApiConfigService {
  constructor(readonly config: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get nodeEnv(): string {
    return this.config.get<string>('NODE_ENV') || 'development';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get graphQLConfig(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      debug: !this.isProduction,
      playground: this.isProduction
        ? false
        : {
            settings: {
              'request.credentials': 'same-origin',
            },
          },
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      context: ({ req, res }: { req: Request; res: Response }): AppContext => ({
        httpContext: { req, res },
        session: req.session,
        currentUserId: req.session.userId,
      }),
    };
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return this.isProduction
      ? {
          type: 'postgres',
          url: this.getString('DATABASE_URL'),
          logging: ['error', 'warn'],
          autoLoadEntities: true,
          synchronize: false,
          dropSchema: false,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        }
      : {
          type: 'postgres',
          url: this.config.get<string>('DATABASE_URL'),
          synchronize: true,
          dropSchema: true,
          autoLoadEntities: true,
          keepConnectionAlive: true,
          logging: ['error', 'info', 'log', 'migration', 'query', 'schema', 'warn'],
        };
  }

  public get(key: string): string {
    const value = this.config.get<string>(key);

    if (value === undefined || value === null) {
      // probably we should call process.exit() too to avoid locking the service
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
