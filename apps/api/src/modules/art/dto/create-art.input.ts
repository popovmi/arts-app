import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateArtInput {
    @IsString()
    @Field(() => String)
    name: string;

    @IsBoolean()
    @IsOptional()
    @Field(() => Boolean, { nullable: true, defaultValue: true })
    internal: boolean;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    projectId: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    bottomForm: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    artClass: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    form: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    nominalVolume: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    height: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    productType: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    productionMethod: string;

    @Field(() => String, { nullable: true })
    ringType: string;

    @Field(() => String)
    @IsString()
    filePath: string;

    format() {
        return {
            ...this,
            name: this.name.toUpperCase(),
        };
    }
}
