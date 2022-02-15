import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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

@InputType()
export class NumberFieldOptions {
    @IsOptional()
    @IsNumber()
    @Field(() => Number, { nullable: true })
    is?: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Number, { nullable: true })
    not?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    @Field(() => [Number], { nullable: true })
    in?: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    @Field(() => [Number], { nullable: true })
    notIn?: number[];

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    lt?: number;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    lte?: number;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    gt?: number;

    @IsOptional()
    @IsNumber()
    @Field({ nullable: true })
    gte?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    @Field(() => [Number], { nullable: true })
    between?: [number, number];
}

@InputType()
export class DateFieldOptions {
    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    is?: number;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    not?: number;

    @IsOptional()
    @IsDate({ each: true })
    @Field(() => [Date], { nullable: true })
    in?: number[];

    @IsOptional()
    @IsDate({ each: true })
    @Field(() => [Date], { nullable: true })
    notIn?: number[];

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    lt?: Date;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    lte?: Date;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    gt?: Date;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    gte?: Date;

    @IsOptional()
    @IsDate({ each: true })
    @Field(() => [Date], { nullable: true })
    between?: [Date, Date];
}
