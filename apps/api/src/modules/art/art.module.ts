import { ProjectModule } from '@/modules/project/project.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtResolver } from './art.resolver';
import { ArtFile } from './entity/art-file.entity';
import { Art } from './entity/art.entity';
import { ArtLoader } from './loaders';
import { ArtFileService, ArtService } from './services';

@Module({
    imports: [forwardRef(() => ProjectModule), TypeOrmModule.forFeature([Art, ArtFile])],
    providers: [ArtResolver, ArtService, ArtFileService, ArtLoader],
    exports: [ArtService],
})
export class ArtModule {}
