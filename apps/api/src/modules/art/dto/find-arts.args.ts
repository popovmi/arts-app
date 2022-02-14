import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import ConnectionArgs from 'common/connection-args.type';
import { BooleanFieldOption, StringFieldOption } from 'common/filter-input.type';
import { LogicalOperator } from 'shared/types';
import { OrderDirection } from 'shared/types/order';

@InputType()
export class ArtFilterQuery {
  @Field(() => [ArtFilterQuery], { nullable: true })
  [LogicalOperator.AND]?: ArtFilterQuery[];

  @Field(() => [ArtFilterQuery], { nullable: true })
  [LogicalOperator.OR]?: ArtFilterQuery[];

  @Field(() => StringFieldOption, { nullable: true })
  id?: StringFieldOption;

  @Field(() => StringFieldOption, { nullable: true })
  name?: StringFieldOption;

  @Field(() => BooleanFieldOption, { nullable: true })
  internal?: BooleanFieldOption;
}

@InputType()
export class ArtOrderQuery {
  @Field(() => OrderDirection, { nullable: true })
  id?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  name?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  internal?: OrderDirection;
}

@ArgsType()
export class FindArtArgs {
  @Field(() => ArtFilterQuery, { nullable: true })
  filter: ArtFilterQuery;

  @Field(() => ConnectionArgs, { nullable: true, defaultValue: {} })
  @Type(() => ConnectionArgs)
  pagination: ConnectionArgs;

  @Field(() => ArtOrderQuery, { nullable: true })
  order: ArtOrderQuery;
}
