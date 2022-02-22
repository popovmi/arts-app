import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCustomerInput, UpdateCustomerInput } from './dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) {}

  public async getByIds(ids: string[]) {
    return await this.customerRepository.find({ id: In(ids) });
  }

  public async create(input: CreateCustomerInput) {
    const customer = await this.customerRepository.save(input);

    return customer;
  }

  public async findAll() {
    const customers = await this.customerRepository.find({ order: { createdAt: 'ASC' } });

    return customers;
  }

  public async findOne(id: string) {
    const customers = await this.customerRepository.findOne({ id });

    return customers;
  }

  public async update({ id, ...input }: UpdateCustomerInput) {
    const customer = await this.customerRepository.findOneOrFail({ id });

    Object.assign(customer, input);
    await this.customerRepository.save(customer);

    return customer;
  }

  public async remove(id: string) {
    await this.customerRepository.findOneOrFail({ id }, { select: ['id'] });
    await this.customerRepository.delete({ id });
  }

  public async isActive(id: string) {
    await this.customerRepository.findOneOrFail({
      where: { id, active: true },
      select: ['id'],
    });
  }
}
