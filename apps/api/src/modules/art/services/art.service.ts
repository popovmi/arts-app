import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { filterQuery, orderQuery } from 'shared/utils/query-builder';
import { In, Repository } from 'typeorm';
import { CreateArtInput } from '../dto';
import { FindArtArgs } from '../dto/find-arts.args';
import { ArtResponse } from '../dto/arts.response';
import { UpdateArtInput } from '../dto/update-art.input';
import { Art } from '../entity/art.entity';
import { ArtFileService } from './art-file.service';
import { v4 } from 'uuid';

@Injectable()
export class ArtService {
  constructor(
    @InjectRepository(Art) private artRepository: Repository<Art>,
    private artFileService: ArtFileService
  ) {}

  async getArt(id: string): Promise<Art> {
    return this.artRepository.findOne({ id });
  }

  async getArts({ filter, order, pagination }: FindArtArgs): Promise<ArtResponse> {
    const { take = 50, skip = 0 } = pagination.pagingParams();
    const query = filterQuery(this.artRepository.createQueryBuilder(), filter).skip(skip).take(take);

    orderQuery(query, { ...order });

    const [arts, count] = await query.getManyAndCount();
    const page = connectionFromArraySlice(arts, pagination, { arrayLength: count, sliceStart: skip || 0 });

    return { page, pageData: { count, take, skip } };
  }

  public async createArt(createArtInput: CreateArtInput): Promise<Art> {
    const { filePath, ...input } = createArtInput;

    const art = await this.artRepository.save({ ...input });

    if (filePath) await this.artFileService.saveArtFile(filePath, art);

    return art;
  }

  public async updateArt(updateArtInput: UpdateArtInput): Promise<Art> {
    const { id, filePath, ...updateInput } = updateArtInput;
    const art = await this.artRepository.findOneOrFail({ id });

    if (filePath) await this.artFileService.saveArtFile(filePath, art);
    Object.assign(art, { ...updateInput });

    return await this.artRepository.save(art);
  }

  public async loadArtsFiles(ids: string[]): Promise<Pick<Art, 'id' | 'files'>[]> {
    const arts = await this.artRepository.find({ where: { id: In(ids) }, select: ['id'], relations: ['files'] });
    return arts;
  }
}
