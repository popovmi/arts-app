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
  @IsOptional()
  @IsString()
  filePath?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ringType: string;

  format() {
    return {
      ...this,
      ...(this.name ? { name: this.name.toUpperCase() } : {}),
    };
  }
}
