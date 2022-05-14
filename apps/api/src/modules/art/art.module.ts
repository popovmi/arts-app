import { ProjectModule } from '@/modules/project';
import { UserModule } from '@/modules/user';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtFileMigrator } from './art-file.migrator';
import { ArtResolver } from './art.resolver';
import { Art, ArtComment, ArtFile } from './entity';
import { FileUploadController } from './file-upload.controller';
import { ArtLoader } from './loaders';
import { ArtFileService, ArtService } from './services';

@Module({
    imports: [
        UserModule,
        forwardRef(() => ProjectModule),
        TypeOrmModule.forFeature([Art, ArtFile, ArtComment]),
    ],
    providers: [ArtResolver, ArtService, ArtFileService, ArtLoader, ArtFileMigrator],
    controllers: [FileUploadController],
    exports: [ArtService],
})
export class ArtModule {}
