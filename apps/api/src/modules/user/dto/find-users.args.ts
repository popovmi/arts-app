import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import ConnectionArgs from 'common/connection.args';
import { BooleanFieldOption, StringFieldOption } from 'common/filter-input.type';
import { Operator } from 'shared/utils/query-builder/filter-builder';

@InputType()
export class UserFilterQuery {
  @Field(() => [UserFilterQuery], { nullable: true })
  [Operator.AND]?: UserFilterQuery[];

  @Field(() => [UserFilterQuery], { nullable: true })
  [Operator.OR]?: UserFilterQuery[];

  @Field(() => StringFieldOption, { nullable: true })
  username?: StringFieldOption;

  @Field(() => StringFieldOption, { nullable: true })
  fullName?: StringFieldOption;

  @Field(() => BooleanFieldOption, { nullable: true })
  active?: BooleanFieldOption;
}

@ArgsType()
export class FindUsersArgs {
  @Field(() => UserFilterQuery, { nullable: true })
  filter: UserFilterQuery;

  @Field(() => ConnectionArgs, { nullable: true })
  @Type(() => ConnectionArgs)
  pagination: ConnectionArgs;
}
