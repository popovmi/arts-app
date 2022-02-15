import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProjectInput {
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

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    hasDesignDoc?: boolean;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    dropNumber?: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    intercenter?: string;

    @IsString()
    @IsOptional()
    @Field(() => String, { nullable: true })
    sfm?: string;

    format() {
        return {
            ...this,
            ...(this.name ? { name: this.name.toUpperCase() } : {}),
        };
    }
}
