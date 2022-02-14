import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Factory } from './entities/factory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factory])],
})
export class FactoryModule {}
