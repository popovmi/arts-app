import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Factory')
export class FactoryType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
