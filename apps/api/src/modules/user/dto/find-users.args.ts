import ConnectionArgs from '@/common/connection-args.type';
import { BooleanFieldOption, StringFieldOption } from '@/common/filter-input.type';
import { LogicalOperator } from '@/shared/types';
import { OrderDirection } from '@/shared/types/order';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class UserFilterQuery {
    @Field(() => [UserFilterQuery], { nullable: true })
    [LogicalOperator.AND]?: UserFilterQuery[];

    @Field(() => [UserFilterQuery], { nullable: true })
    [LogicalOperator.OR]?: UserFilterQuery[];

    @Field(() => StringFieldOption, { nullable: true })
    id?: StringFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    username?: StringFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    fullName?: StringFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    role?: StringFieldOption;

    @Field(() => BooleanFieldOption, { nullable: true })
    active?: BooleanFieldOption;
}

@InputType()
export class UserOrderQuery {
    @Field(() => OrderDirection, { nullable: true })
    username?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    fullName?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    active?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    role?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    id?: OrderDirection;
}

@ArgsType()
export class FindUsersArgs {
    @Field(() => UserFilterQuery, { nullable: true })
    filter: UserFilterQuery;

    @Field(() => ConnectionArgs, { nullable: true, defaultValue: {} })
    @Type(() => ConnectionArgs)
    pagination: ConnectionArgs;

    @Field(() => UserOrderQuery, { nullable: true })
    order: UserOrderQuery;
}
