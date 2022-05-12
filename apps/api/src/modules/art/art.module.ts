import { ProjectModule } from '@/modules/project';
import { UserModule } from '@/modules/user';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtResolver } from './art.resolver';
import { ArtFile } from './entity/art-file.entity';
import { Art } from './entity/art.entity';
import { FileUploadController } from './file-upload.controller';
import { ArtLoader } from './loaders';
import { ArtFileService, ArtService } from './services';

@Module({
  imports: [
    UserModule,
    forwardRef(() => ProjectModule),
    TypeOrmModule.forFeature([Art, ArtFile]),
  ],
  providers: [ArtResolver, ArtService, ArtFileService, ArtLoader],
  controllers: [FileUploadController],
  exports: [ArtService],
})
export class ArtModule {}
