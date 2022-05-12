import { filterQuery } from '@/shared/utils/query-builder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCustomerInput, FindCustomerArgs, UpdateCustomerInput } from './dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) {}

    public async getByIds(ids: string[]) {
        return await this.customerRepository.find({ where: { id: In(ids) } });
    }

    public async create(input: CreateCustomerInput) {
        const customer = await this.customerRepository.save(input);

        return customer;
    }

    public async findAll({ filter }: FindCustomerArgs) {
        // const { take = 50, skip = 0 } = pagination.pagingParams();
        const query = filterQuery(
            this.customerRepository.createQueryBuilder('customers'),
            'customers',
            filter,
            []
        );
        //   .skip(skip)
        //   .take(take);
        // const count = await query.getCount();
        query.orderBy('customers.name', 'ASC');

        const customers = await query.getMany();
        // const page = connectionFromArraySlice(customers, pagination, {
        //   arrayLength: count,
        //   sliceStart: skip || 0,
        // });
        return customers;
        // return { page, pageData: { count, take, skip } };
    }

    public async findOne(id: string) {
        const customers = await this.customerRepository.findOne({ where: { id } });

        return customers;
    }

    public async update({ id, ...input }: UpdateCustomerInput) {
        const customer = await this.customerRepository.findOneOrFail({ where: { id } });

        Object.assign(customer, input);
        await this.customerRepository.save(customer);

        return customer;
    }

    public async remove(id: string) {
        await this.customerRepository.findOneOrFail({ where: { id }, select: ['id'] });
        await this.customerRepository.delete({ id });
    }

    public async isActive(id: string) {
        await this.customerRepository.findOneOrFail({
            where: { id, active: true },
            select: ['id'],
        });
    }
}
