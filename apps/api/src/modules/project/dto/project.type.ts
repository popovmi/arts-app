import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  internal: boolean;

  @Field(() => Boolean)
  hasDesignDoc: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
