import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { filterQuery, orderQuery } from 'shared/utils/query-builder';
import { Repository } from 'typeorm';
import { CreateArtInput } from './dto';
import { FindArtArgs } from './dto/find-arts.args';
import { ArtResponse } from './dto/arts.response';
import { UpdateArtInput } from './dto/update-art.input';
import { Art } from './entity/art.entity';

@Injectable()
export class ArtService {
  constructor(@InjectRepository(Art) private artRepository: Repository<Art>) {}

  async getArt(id: string): Promise<Art> {
    return this.artRepository.findOne({ id });
  }

  async getArts({ filter, order, pagination }: FindArtArgs): Promise<ArtResponse> {
    const query = filterQuery(this.artRepository.createQueryBuilder(), filter);
    const { take = 50, skip = 0 } = pagination.pagingParams();

    query.skip(skip);
    query.take(take);
    orderQuery(query, { ...order });

    const [arts, count] = await query.getManyAndCount();
    const page = connectionFromArraySlice(arts, pagination, { arrayLength: count, sliceStart: skip || 0 });

    return { page, pageData: { count, take, skip } };
  }

  public async createArt(createArtInput: CreateArtInput): Promise<Art> {
    const { internal, name } = createArtInput;

    const art = this.artRepository.create({
      internal,
      name,
    });

    return await this.artRepository.save(art);
  }

  public async updateArt(updateArtInput: UpdateArtInput): Promise<Art> {
    const { id, ...updateInput } = updateArtInput.format();
    const art = await this.artRepository.findOneOrFail({ id });

    Object.assign(art, {
      ...updateInput,
    });

    return await this.artRepository.save(art);
  }
}
