import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from './entities/factory.entity';
import { FactoryResolver } from './factory.resolver';
import { FactoryService } from './factory.service';

@Module({
    imports: [TypeOrmModule.forFeature([Factory])],
    providers: [FactoryService, FactoryResolver],
    exports: [FactoryService],
})
export class FactoryModule {}
