import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeResolver } from './attribute.resolver';
import { AttributeService } from './attribute.service';
import * as Entities from './entities';

const EntitiesArray = Object.values(Entities);

@Module({
  imports: [TypeOrmModule.forFeature(EntitiesArray)],
  providers: [AttributeService, AttributeResolver],
})
export class AttributeModule {}
