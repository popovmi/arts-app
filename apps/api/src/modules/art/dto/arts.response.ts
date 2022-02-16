import { ObjectType } from '@nestjs/graphql';
import relayTypes from '@/common/relay.types';
import { ArtType } from '.';

@ObjectType()
export class ArtResponse extends relayTypes<ArtType>(ArtType) {}
