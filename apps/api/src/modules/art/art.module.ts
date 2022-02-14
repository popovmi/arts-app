import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './entity/art.entity';
import { ArtResolver } from './art.resolver';
import { ArtService } from './art.service';

@Module({
  imports: [TypeOrmModule.forFeature([Art])],
  providers: [ArtResolver, ArtService],
  exports: [ArtService],
})
export class ArtModule {}
