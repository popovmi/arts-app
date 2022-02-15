import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './entity/art.entity';
import { ArtResolver } from './art.resolver';
import { ArtService, ArtFileService } from './services';
import { ArtFile } from './entity/art-file.entity';
import { ProjectModule } from 'modules/project/project.module';
import { ArtLoader } from './loaders';

@Module({
    imports: [forwardRef(() => ProjectModule), TypeOrmModule.forFeature([Art, ArtFile])],
    providers: [ArtResolver, ArtService, ArtFileService, ArtLoader],
    exports: [ArtService],
})
export class ArtModule {}
