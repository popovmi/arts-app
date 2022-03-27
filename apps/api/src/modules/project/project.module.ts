import { ArtModule } from '@/modules/art/art.module';
import { CustomerModule } from '@/modules/customer/customer.module';
import { FactoryModule } from '@/modules/factory/factory.module';
import { UserModule } from '@/modules/user';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { ProjectLoader } from './loaders';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    UserModule,
    forwardRef(() => ArtModule),
    forwardRef(() => FactoryModule),
    forwardRef(() => CustomerModule),
    TypeOrmModule.forFeature([Project]),
  ],
  providers: [ProjectResolver, ProjectService, ProjectLoader],
  exports: [ProjectService],
})
export class ProjectModule {}
