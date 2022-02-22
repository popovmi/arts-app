import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BaseAttributeType {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Number)
  valueOrder: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
