import relayTypes from '@/common/relay.types';
import { ObjectType } from '@nestjs/graphql';
import { FactoryType } from './factory.type';

@ObjectType()
export class CustomersResponse extends relayTypes<FactoryType>(FactoryType) {}
