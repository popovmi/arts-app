import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateArtInput {
    @IsString()
    @Field({ nullable: false })
    id: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    name?: string;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    internal?: boolean;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    projectId: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    bottomForm: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    artClass: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    form: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    nominalVolume: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    height: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    productType: string = null;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    productionMethod: string = null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    filePath?: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    ringType: string = null;

    format() {
        return {
            ...this,
            ...(this.name ? { name: this.name.toUpperCase() } : {}),
        };
    }
}
