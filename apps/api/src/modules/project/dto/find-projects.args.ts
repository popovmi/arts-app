import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import ConnectionArgs from '@/common/connection-args.type';
import { BooleanFieldOption, StringFieldOption } from '@/common/filter-input.type';
import { LogicalOperator, OrderDirection } from '@/shared/types';

@InputType()
export class ProjectFilterQuery {
    @Field(() => [ProjectFilterQuery], { nullable: true })
    [LogicalOperator.AND]?: ProjectFilterQuery[];

    @Field(() => [ProjectFilterQuery], { nullable: true })
    [LogicalOperator.OR]?: ProjectFilterQuery[];

    @Field(() => StringFieldOption, { nullable: true })
    id?: StringFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    name?: StringFieldOption;

    @Field(() => BooleanFieldOption, { nullable: true })
    internal?: BooleanFieldOption;

    @Field(() => BooleanFieldOption, { nullable: true })
    hasDesignDoc?: BooleanFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    dropNumber?: StringFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    intercenter?: StringFieldOption;

    @Field(() => StringFieldOption, { nullable: true })
    sfm?: StringFieldOption;
}

@InputType()
export class ProjectOrderQuery {
    @Field(() => OrderDirection, { nullable: true })
    id?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    name?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    internal?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    hasDesignDoc?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    dropNumber?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    intercenter?: OrderDirection;

    @Field(() => OrderDirection, { nullable: true })
    sfm?: OrderDirection;
}

@ArgsType()
export class FindProjectArgs {
    @Field(() => ProjectFilterQuery, { nullable: true })
    filter: ProjectFilterQuery;

    @Field(() => ConnectionArgs, { nullable: true, defaultValue: {} })
    @Type(() => ConnectionArgs)
    pagination: ConnectionArgs;

    @Field(() => ProjectOrderQuery, { nullable: true })
    order: ProjectOrderQuery;
}
