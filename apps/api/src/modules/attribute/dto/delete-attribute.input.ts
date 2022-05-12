import { InputType, Field } from '@nestjs/graphql';
import { AttributeType } from '../attribute-type';

@InputType()
export class DeleteAttributeInput {
    @Field(() => AttributeType)
    type: AttributeType;

    @Field()
    id: number;
}
