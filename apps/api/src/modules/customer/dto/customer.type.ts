import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Customer')
export class CustomerType {
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
