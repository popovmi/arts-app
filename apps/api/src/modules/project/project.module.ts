import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtModule } from '@/modules/art/art.module';
import { Project } from './entity/project.entity';
import { ProjectLoader } from './loaders';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { FactoryModule } from '@/modules/factory/factory.module';
import { CustomerModule } from '@/modules/customer/customer.module';

@Module({
  imports: [
    forwardRef(() => ArtModule),
    forwardRef(() => FactoryModule),
    forwardRef(() => CustomerModule),
    TypeOrmModule.forFeature([Project]),
  ],
  providers: [ProjectResolver, ProjectService, ProjectLoader],
  exports: [ProjectService],
})
export class ProjectModule {}
