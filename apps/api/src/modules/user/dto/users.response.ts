import { ObjectType } from '@nestjs/graphql';
import relayTypes from 'common/relay.types';
import { UserType } from '.';

@ObjectType()
export class UserResponse extends relayTypes<UserType>(UserType) {}
