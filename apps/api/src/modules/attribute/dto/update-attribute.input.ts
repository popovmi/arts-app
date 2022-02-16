import { InputType, Field } from '@nestjs/graphql';
import { AttributeType } from '../attribute-type';

@InputType()
export class UpdateAttributeInput {
    @Field(() => AttributeType)
    type: AttributeType;

    @Field()
    id: number;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    active: boolean;
}
