import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './entity/art.entity';
import { ArtResolver } from './art.resolver';
import { ArtService } from './art.service';
import { ArtFile } from './entity/art-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Art, ArtFile])],
  providers: [ArtResolver, ArtService],
  exports: [ArtService],
})
export class ArtModule {}
