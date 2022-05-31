import { CreateArtInput } from '@/modules/art/dto';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, ValidateNested, IsArray } from 'class-validator';

@InputType()
export class CreateProjectInput {
    @IsString()
    @Field(() => String)
    name: string;

    @IsBoolean()
    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    internal: boolean;

    @IsBoolean()
    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    hasDesignDoc: boolean;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    dropNumber: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    intercenter: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    sfm: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    customerId: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    factoryId: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateArtInput)
    @Field(() => [CreateArtInput], { nullable: true })
    arts: CreateArtInput[];

    format() {
        return {
            ...this,
            name: this.name.toUpperCase(),
        };
    }
}
