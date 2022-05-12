import ConnectionArgs from '@/common/connection-args.type';
import { StringFieldOption } from '@/common/filter-input.type';
import { LogicalOperator } from '@/shared/types';
import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class CustomerFilterQuery {
    @Field(() => [CustomerFilterQuery], { nullable: true })
    [LogicalOperator.AND]?: CustomerFilterQuery[];

    @Field(() => [CustomerFilterQuery], { nullable: true })
    [LogicalOperator.OR]?: CustomerFilterQuery[];

    @Field(() => StringFieldOption, { nullable: true })
    name?: StringFieldOption;
}

@ArgsType()
export class FindCustomerArgs {
    @Field(() => CustomerFilterQuery, { nullable: true })
    filter: CustomerFilterQuery;

    @Field(() => ConnectionArgs, { nullable: true, defaultValue: {} })
    @Type(() => ConnectionArgs)
    pagination: ConnectionArgs;
}
