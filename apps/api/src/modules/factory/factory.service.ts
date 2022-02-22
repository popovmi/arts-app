import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateFactoryInput, UpdateFactoryInput } from './dto';
import { Factory } from './entities/factory.entity';

@Injectable()
export class FactoryService {
  constructor(@InjectRepository(Factory) private factoryRepo: Repository<Factory>) {}

  public async getByIds(ids: string[]) {
    return await this.factoryRepo.find({ id: In(ids) });
  }

  public async create(input: CreateFactoryInput) {
    const factory = await this.factoryRepo.save(input);

    return factory;
  }

  public async findAll() {
    const factories = await this.factoryRepo.find({ order: { createdAt: 'ASC' } });

    return factories;
  }

  public async findOne(id: string) {
    const factories = await this.factoryRepo.findOne({ id });

    return factories;
  }

  public async update({ id, ...input }: UpdateFactoryInput) {
    const factory = await this.factoryRepo.findOneOrFail({ id });

    Object.assign(factory, input);
    await this.factoryRepo.save(factory);

    return factory;
  }

  public async remove(id: string) {
    await this.factoryRepo.findOneOrFail({ id }, { select: ['id'] });
    await this.factoryRepo.delete({ id });
  }

  public async isActive(id: string) {
    await this.factoryRepo.findOneOrFail({
      where: { id, active: true },
      select: ['id'],
    });
  }
}
