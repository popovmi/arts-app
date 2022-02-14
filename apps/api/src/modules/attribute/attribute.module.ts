import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Entities))],
})
export class AttributeModule {}
