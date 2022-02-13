import { ObjectType } from '@nestjs/graphql';
import relayTypes from 'common/relay.types';
import { ProjectType } from '.';

@ObjectType()
export class ProjectResponse extends relayTypes<ProjectType>(ProjectType) {}
