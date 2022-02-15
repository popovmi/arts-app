import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAttributeInput {
    @IsString()
    @Field()
    name: string;

    @IsBoolean()
    @IsOptional()
    @Field()
    active?: boolean;
}
