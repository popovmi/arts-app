import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Art')
export class ArtType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  internal: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
