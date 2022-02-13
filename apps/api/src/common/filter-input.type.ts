import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class StringFieldOption {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  is?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  not?: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  in?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  notIn?: string[];

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lt?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lte?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  gt?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  gte?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  contains?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  notContains?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  startsWith?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  notStartsWith?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  endsWith?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  notEndsWith?: string;
}

@InputType()
export class BooleanFieldOption {
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  is?: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  not?: boolean;
}
