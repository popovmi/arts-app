import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCustomerInput, CustomerType, UpdateCustomerInput } from './dto';
import { CustomerService } from './customer.service';

@Resolver(() => CustomerType)
export class CustomerResolver {
    constructor(readonly customerService: CustomerService) {}

    @Mutation(() => CustomerType)
    public async createCustomer(@Args('input') input: CreateCustomerInput) {
        return await this.customerService.create(input);
    }

    @Query(() => [CustomerType])
    public async customers() {
        return await this.customerService.findAll();
    }

    @Query(() => CustomerType)
    public async customer(@Args('id') id: string) {
        return await this.customerService.findOne(id);
    }

    @Mutation(() => CustomerType)
    public async updateCustomer(@Args('input') input: UpdateCustomerInput) {
        return await this.customerService.update(input);
    }

    // @Mutation(() => Boolean)
    // public async remove(@Args('id') id: string) {
    //     await this.factoryService.remove(id);
    //     return true;
    // }
}
