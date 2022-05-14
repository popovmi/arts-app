import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { AttributeType } from '../attribute-type';

@InputType()
export class CreateAttributeInput {
    @Field(() => AttributeType)
    type: AttributeType;

    @IsString()
    @Field()
    name: string;

    @IsBoolean()
    @IsOptional()
    @Field()
    active?: boolean;
}
