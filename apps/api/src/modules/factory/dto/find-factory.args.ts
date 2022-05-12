import ConnectionArgs from '@/common/connection-args.type';
import { StringFieldOption } from '@/common/filter-input.type';
import { LogicalOperator } from '@/shared/types';
import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class FactoryFilterQuery {
  @Field(() => [FactoryFilterQuery], { nullable: true })
  [LogicalOperator.AND]?: FactoryFilterQuery[];

  @Field(() => [FactoryFilterQuery], { nullable: true })
  [LogicalOperator.OR]?: FactoryFilterQuery[];

  @Field(() => StringFieldOption, { nullable: true })
  name?: StringFieldOption;
}

@ArgsType()
export class FindFactoryArgs {
  @Field(() => FactoryFilterQuery, { nullable: true })
  filter: FactoryFilterQuery;

  @Field(() => ConnectionArgs, { nullable: true, defaultValue: {} })
  @Type(() => ConnectionArgs)
  pagination: ConnectionArgs;
}
