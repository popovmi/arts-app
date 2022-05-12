import { filterQuery } from '@/shared/utils/query-builder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateFactoryInput, FindFactoryArgs, UpdateFactoryInput } from './dto';
import { Factory } from './entities/factory.entity';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory) private factoryRepo: Repository<Factory>
  ) {}

  public async getByIds(ids: string[]) {
    return await this.factoryRepo.find({ where: { id: In(ids) } });
  }

  public async create(input: CreateFactoryInput) {
    const factory = await this.factoryRepo.save(input);

    return factory;
  }

  public async findAll({ filter }: FindFactoryArgs) {
    // const { take = 50, skip = 0 } = pagination.pagingParams();
    const query = filterQuery(
      this.factoryRepo.createQueryBuilder('factories'),
      'factories',
      filter,
      []
    );
    //   .skip(skip)
    //   .take(take);
    // const count = await query.getCount();
    query.orderBy('factories.name', 'ASC');

    const customers = await query.getMany();
    // const page = connectionFromArraySlice(customers, pagination, {
    //   arrayLength: count,
    //   sliceStart: skip || 0,
    // });
    return customers;
    // return { page, pageData: { count, take, skip } };
  }

  public async findOne(id: string) {
    const factories = await this.factoryRepo.findOne({ where: { id } });

    return factories;
  }

  public async update({ id, ...input }: UpdateFactoryInput) {
    const factory = await this.factoryRepo.findOneOrFail({ where: { id } });

    Object.assign(factory, input);
    await this.factoryRepo.save(factory);

    return factory;
  }

  public async remove(id: string) {
    await this.factoryRepo.findOneOrFail({ where: { id }, select: ['id'] });
    await this.factoryRepo.delete({ id });
  }

  public async isActive(id: string) {
    await this.factoryRepo.findOneOrFail({
      where: { id, active: true },
      select: ['id'],
    });
  }
}
