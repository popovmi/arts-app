import { Module } from '@nestjs/common';
import { BaseAttributeModule } from './base-attribute.module';
import * as Entities from './entities';

const EntitiesArray = Object.values(Entities);

@Module({
    imports: [BaseAttributeModule.register(EntitiesArray)],
})
export class AttributeModule {}
