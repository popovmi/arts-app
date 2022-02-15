import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtModule } from 'modules/art/art.module';
import { Project } from './entity/project.entity';
import { ProjectLoader } from './loaders';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [forwardRef(() => ArtModule), TypeOrmModule.forFeature([Project])],
  providers: [ProjectResolver, ProjectService, ProjectLoader],
  exports: [ProjectService],
})
export class ProjectModule {}
