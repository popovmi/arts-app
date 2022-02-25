import { ApiConfigService } from '@/shared';
import { logger } from '@/shared/logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonAdaptor } from 'typeorm-logger-adaptor/logger/winston';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => {
        return config.isProduction
          ? {
              type: 'postgres',
              url: config.get('DATABASE_URL'),
              logger: new WinstonAdaptor(logger, ['error', 'warn']),
              autoLoadEntities: true,
              synchronize: false,
              dropSchema: false,
            }
          : {
              type: 'postgres',
              url: config.get('DATABASE_URL'),
              synchronize: false,
              dropSchema: false,
              autoLoadEntities: true,
              keepConnectionAlive: true,
              logger: new WinstonAdaptor(logger, 'all'),
            };
      },
    }),
  ],
})
export class DbModule {}
