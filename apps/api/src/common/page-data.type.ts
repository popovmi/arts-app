import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageData {
  @Field()
  public count: number;

  @Field()
  public take: number;

  @Field()
  public skip: number;
}
