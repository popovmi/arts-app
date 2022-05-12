import relayTypes from '@/common/relay.types';
import { ObjectType } from '@nestjs/graphql';
import { CustomerType } from './customer.type';

@ObjectType()
export class CustomersResponse extends relayTypes<CustomerType>(CustomerType) {}
